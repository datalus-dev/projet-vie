import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
  depends('supabase:db:travel');
  const { data: usernames } = await supabase.from('usernames').select('username');

  return { usernames: usernames ?? [] };
};
