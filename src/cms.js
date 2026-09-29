import fallback from './content.json';

const { VITE_CF_SPACE_ID: space, VITE_CF_TOKEN: token, VITE_CF_CONTENT_TYPE: type = 'productPage' } = import.meta.env;


export async function loadContent() {
  if (!space || !token) return fallback;
  try {
    const url = `https://cdn.contentful.com/spaces/${space}/environments/master/entries?content_type=${type}&limit=1&access_token=${token}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.status);
    const { items } = await res.json();
    return { ...fallback, ...(items[0]?.fields ?? {}) };
  } catch (e) {
    console.warn('CMS unavailable, using local content', e);
    return fallback;
  }
}
