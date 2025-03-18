export const load = async ({ locals: {supabase} }) => {


    const { data: usernames } = await supabase.from('usernames').select('username')

    return { usernames }
}
