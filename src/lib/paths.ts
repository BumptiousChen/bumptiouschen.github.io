const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export function pathFor(path = '/') {
  return `${base}/${path.replace(/^\/+/, '')}`;
}
export function postPath(id: string) {
  return pathFor(`posts/${id.split('/').map(encodeURIComponent).join('/')}/`);
}
