export const prerender = true

export const load = async ({ url, fetch, locals: {supabase} }) => {
    const recsRes = await fetch(`${url.origin}/api/logs/log-recommendations.toml`)
    // const transpLookupRes = await fetch(`${url.origin}/api/logs/transportation-code-lookup.toml`)

    const recs = await recsRes.json()
    // const transpLookup = await transpLookupRes.json()

    const { data: travel } = await supabase.from('travel').select('content, contentType, tripId, stayId')
    
    const travelGroupBy = Object.groupBy(travel, ({stayId}) => stayId);
    
    // Ensure that photoAlbum precedes tripInfo
    Object.entries(travelGroupBy).forEach(([stayId, trip]) => {
        trip.sort((a, b) => {
        const contentTypeA = a.contentType.toUpperCase();
        const contentTypeB = b.contentType.toUpperCase();
        if (contentTypeA < contentTypeB) {
          return -1;
        }
        if (contentTypeA > contentTypeB) {
          return 1;
        }
        return 0;
      })
    })

    return { recs, travelGroupBy }
}
