export function calendarDate(date: Date) {
  return date.toISOString().slice(0, 10);
}
export function todayInShanghai(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now);
  const part = (type: string) => parts.find((item) => item.type === type)!.value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}
export function isPublished(data: { draft?: boolean; pubDate: Date }, today = todayInShanghai()) {
  return data.draft !== true && calendarDate(data.pubDate) <= today;
}
export function formatDate(date: Date) { return calendarDate(date).replaceAll('-', '.'); }
export function selectHomepagePosts<T extends { id: string }>(posts: T[], featuredIds: string[], limit: number) {
  const byId = new Map(posts.map((post) => [post.id, post]));
  const ids = [...new Set([...featuredIds, ...posts.map((post) => post.id)])];
  return ids.flatMap((id) => byId.has(id) ? [byId.get(id)!] : []).slice(0, limit);
}
