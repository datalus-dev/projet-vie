// export const prerender = true

export const load = async ({ url, fetch, locals: {supabase} }) => {
    const travelRes = await fetch(`${url.origin}/api/logs/log-travel.toml`)
    const recsRes = await fetch(`${url.origin}/api/logs/log-recommendations.toml`)
    // const transpLookupRes = await fetch(`${url.origin}/api/logs/transportation-code-lookup.toml`)

    const logTravel = await travelRes.json()
    const recs = await recsRes.json()
    // const transpLookup = await transpLookupRes.json()

    const { data: travel } = await supabase.from('travel').select('content, contentType, tripId')
    
    const travelGroupBy = Object.groupBy(travel, ({tripId}) => tripId);
    
    // Ensure that photoAlbum precedes tripInfo
    Object.entries(travelGroupBy).forEach(([tripId, trip]) => {
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

    return { logTravel, recs, travel, travelGroupBy }
}
