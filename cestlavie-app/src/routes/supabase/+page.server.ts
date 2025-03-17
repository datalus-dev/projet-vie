import type { PageServerLoad } from './$types'

export const prerender = false


export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  const { data: colors } = await supabase.from('colors').select('name').limit(5).order('name')
  const { data: contents } = await supabase.from('content').select('*')
  return { colors: colors ?? [] , contents: contents ?? []}
}
