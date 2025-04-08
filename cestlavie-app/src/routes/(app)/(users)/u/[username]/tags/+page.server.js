// export const prerender = true

export const load = async ({ url, fetch, params, locals: {supabase, user} }) => {

    // const transpLookupRes = await fetch(`${url.origin}/api/logs/transportation-code-lookup.toml`)
    // const transpLookup = await transpLookupRes.json()

    // loads a user's page and looks up content based on username -> user_id
    const { data: usernames } = await supabase.from('usernames').select('username, user_id').eq('username', params.username)

    const { data: travel } = await supabase.from('travel').select('content, contentType, tripId, stayId').eq('user_id', usernames[0].user_id)
    // loads recommendations. needs to check if auth user is in user's circle

    let recs;
    if (user) {
      let resp = await supabase.from('acl').select('circles').eq('sharer_email', user.email)
      const acl = resp.data;
      
      resp = await supabase.from('recommendations').select('*').overlaps('circles', acl[0].circles)
      recs = resp.data;
    }

    else {
      recs = [];
    }
  
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
