# Solaris Blog

使用 Astro 构建的个人博客，通过 GitHub Actions 发布到 GitHub Pages。

## 本地运行

在 PowerShell 中执行：

```powershell
cd D:\Soalris\bumptiouschen.github.io
npm.cmd install
npm.cmd run dev
```

在 `src/content/blog/` 中添加 Markdown 文件即可写新文章。推送到 `main` 后自动部署到 <https://bumptiouschen.github.io/>。

## D1「休日手帖」首页维护

已实现为原生 Astro 组件，通过 GitHub Actions 发布到 <https://bumptiouschen.github.io/>，也可继续在本地预览。

| 修改内容 | 文件 |
| --- | --- |
| 首页标题、引题、主视觉、文章区标题、数量与优先顺序 | `src/config/home.ts` |
| GitHub、X、B站地址与示例内容开关 | `src/config/site.ts` |
| 文章标题、摘要、日期、分类、封面与正文 | `src/content/blog/*.md` |
| 图片源文件 | `src/assets/images/` |
| 配色、字体、间距与响应式布局 | `public/style.css` |

首页文章区由 `LatestArticles.astro` 和 `ArticlePreview.astro` 组成；列表、分类页也复用文章条目。更新内容不需要修改组件布局。首页按 `featuredIds` 的顺序优先展示，剩余位置用最新文章补齐；清空数组即按日期自动更新。未公开或不存在的 ID 会被忽略。

在 `site.ts` 的 `socials` 中填写个人主页的 `href`，图标会自动成为新标签页外链；留空时只显示带名称提示的图标，不产生虚假跳转。

当前三篇「排版示例」用于本地调整视觉。设置 `site.content.showSamples: false`，可从所有列表及生成的详情路径中统一移除示例。原有 `hello-world.md` 保留不变。

### 写作字段

```yaml
---
title: "我的第一篇游戏手记"
description: "这篇文章的简短介绍。"
pubDate: 2026-10-16
category: game
cover: ../../assets/images/game.png
coverAlt: "群山之间的游戏风景"
draft: false
---
```

分类为 `game`、`anime` 或 `life`。封面可省略；提供封面时须填写图片说明。草稿及未来日期文章不公开；日期按上海时区判断，未来文章到达日期后需要重新构建。公开仓库中的草稿源文件仍可见。

### 检查与素材

```powershell
npm.cmd run build
node --test tests/post-utils.test.ts
```

已有文章、列表、分类、关于页和 404 页面均可使用。图片由 Astro 优化为 WebP 和响应式尺寸。拉丁品牌字体为本地托管的 Cormorant Garamond 子集，许可见 `public/fonts/OFL-Cormorant-Garamond.txt`；中文优先使用设备上的衬线字体。
