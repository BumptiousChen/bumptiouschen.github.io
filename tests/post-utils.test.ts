import test from 'node:test';
import assert from 'node:assert/strict';
import { calendarDate, todayInShanghai, isPublished, selectHomepagePosts } from '../src/lib/post-utils.ts';

test('上海日期在 UTC 午夜之前进入新的一天', () => {
  assert.equal(todayInShanghai(new Date('2026-10-15T16:01:00Z')), '2026-10-16');
  assert.equal(todayInShanghai(new Date('2026-10-15T15:59:00Z')), '2026-10-15');
});
test('草稿和未来日期不会公开，发布日期当天可以公开', () => {
  assert.equal(isPublished({ pubDate: new Date('2026-10-16') }, '2026-10-16'), true);
  assert.equal(isPublished({ pubDate: new Date('2026-10-17') }, '2026-10-16'), false);
  assert.equal(isPublished({ pubDate: new Date('2026-10-10'), draft: true }, '2026-10-16'), false);
  assert.equal(calendarDate(new Date('2026-10-16')), '2026-10-16');
});
test('文章优先顺序去重，忽略未公开 ID，再按列表补齐', () => {
  const posts = [{ id: 'newest' }, { id: 'second' }, { id: 'older' }];
  assert.deepEqual(selectHomepagePosts(posts, ['older', 'older', 'draft'], 2), [posts[2], posts[0]]);
  assert.deepEqual(selectHomepagePosts(posts, [], 3), posts);
});
test('空列表、单篇文章和零展示数量无需凑齐', () => {
  assert.deepEqual(selectHomepagePosts([], ['missing'], 3), []);
  assert.deepEqual(selectHomepagePosts([{ id: 'only' }], [], 3), [{ id: 'only' }]);
  assert.deepEqual(selectHomepagePosts([{ id: 'only' }], [], 0), []);
});
