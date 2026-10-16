import { getCollection } from 'astro:content';
import { site } from '../config/site';
import { isPublished } from './post-utils';
export async function getPublicPosts() {
  return (await getCollection('blog'))
    .filter(({ data }) => isPublished(data) && (site.content.showSamples || !data.sample))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf() || a.id.localeCompare(b.id, 'en'));
}
