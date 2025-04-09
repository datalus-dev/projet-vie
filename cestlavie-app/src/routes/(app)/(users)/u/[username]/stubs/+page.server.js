// export const prerender = true

export const load = async ({ url, fetch, locals: { supabase } }) => {
  const Res = await fetch(`${url.origin}/api/scrapbook/stub_text_extraction.toml`);
  const collection = await Res.json();

  var pages = Object.keys(import.meta.glob('/static/images/thumbnails/stubs/*.jpg'));
  // remove /static from the filepath
  pages = pages.map((page) => page.slice(8));

  const path = '/images/thumbnails/stubs';

  const { data: contents } = await supabase.from('content').select('content, contentType');

  return { collection, path, pages, contents };
};
