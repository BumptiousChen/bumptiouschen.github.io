import hero from '../assets/images/hero.png';
// 首页经常调整的图片、文案和文章顺序集中在这里。
export const home = {
  hero: {
    eyebrow: '游戏、动画与生活随笔',
    title: ['把喜欢的日子，', '装订成册。'],
    image: hero,
    imageAlt: '阳光下的海边铁道口，远处是平静的海面与群山',
    aboutLabel: '了解更多',
  },
  latest: {
    title: '最新文章', allLabel: '查看全部文章', limit: 3,
    // 按此顺序优先展示，其余按日期补齐；清空数组即全自动更新。
    featuredIds: ['sample-game-walk', 'sample-autumn-anime', 'sample-ordinary-days'],
    emptyMessage: '第一篇记录，还在路上。',
  },
};
