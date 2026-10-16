export const categories = {
  game: { label: '游戏', description: '在喜欢的世界里，慢慢探索。' },
  anime: { label: '动画', description: '记下故事结束后，依然留在心里的片刻。' },
  life: { label: '生活', description: '普通日子里的小小发现。' },
} as const;
export type Category = keyof typeof categories;
export type SocialName = 'github' | 'x' | 'bilibili';
export const site = {
  name: 'Solaris',
  description: '关于游戏、动画与生活的个人手帖。记录喜欢的事物，和慢慢流逝的日常。',
  subtitle: '日々の記録',
  footerNote: 'ゲーム、アニメ、そして何気ない日々のこと。',
  // 填入个人主页地址后，图标自动成为外链。
  socials: [
    { name: 'github', label: 'GitHub', href: '' },
    { name: 'x', label: 'X', href: '' },
    { name: 'bilibili', label: 'B站', href: '' },
  ] satisfies { name: SocialName; label: string; href: string }[],
  // 真实文章准备好后设为 false，所有列表与详情同步隐藏排版示例。
  content: { showSamples: true },
};
