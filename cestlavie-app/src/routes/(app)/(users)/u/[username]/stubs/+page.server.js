export const load = async ({ url, fetch, locals: { supabase } }) => {
  const Res = await fetch(`${url.origin}/api/scrapbook/stub_text_extraction.toml`);
  const collection = await Res.json();

  const { data: contents } = await supabase.from('content').select('content, contentType');

  const { data: root } = supabase.storage
    .from('supabase-cestlavie-storage')
    .getPublicUrl('images/thumbnails/stubs');
  const path = root.publicUrl;

  return { collection, path, contents };
};
