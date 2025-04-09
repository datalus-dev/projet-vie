import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
  depends('supabase:db:notes', 'supabase:db:acl');
  const { data: notes } = await supabase.from('notes').select('id,note').order('id');
  const { data: acls } = await supabase
    .from('acl')
    .select('sharer_email, circles')
    .order('sharer_email');
  const { data: usernames } = await supabase.from('usernames').select('username');

  return { notes: notes ?? [], acls: acls ?? [], usernames: usernames ?? [] };
};
