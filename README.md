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

## 调整首页动画

- **更换视频或全息叠图**：编辑 `src/components/OceanMedia.astro`。资源在 `public/media/p3r/`，桌面、手机分别加载一套开场/循环视频，视频通过 `ended` 衔接。
- **修改蓝幕和波浪**：编辑 `src/components/IntroCurtain.astro` 和 `src/styles/p3r-home.css`。四层 SVG 波浪错速运动，蓝幕用 2.5 秒的 CSS 位移退场。
- **修改入场节奏**：编辑 `src/scripts/hero-media.ts` 顶部的 `MOTION`。2 秒波浪退场，4 秒启动开场视频，5 秒叠图淡入，5.8 秒标题错峰出现，6.4 秒导航和底栏出现。
- **修改标题和构图**：编辑 `src/pages/index.astro` 和 `src/styles/p3r-home.css`。标题逐字符入场，每字间隔 40ms；全息图片通过 `screen` 滤色。
- **素材来源**：使用 P3R 官网人物视频与全息图，© ATLUS © SEGA。文件映射见 `public/media/p3r/SOURCES.md`。静态封面取自循环视频，视频加载失败、关闭 JavaScript 或减少动态效果时仍可浏览首页。

此前的抽象人影组件 `DriftingFigure.astro`、`intro.ts`、`home.css` 保留在项目中，当前首页不再引用，方便继续比较和编辑。

首次打开首页播放动画，同一浏览器标签页之后直接进入循环画面。“跳过动画”会直接显示文章入口；右下角可重播开场或暂停背景。切换到后台时暂停视频，返回后按此前的播放状态继续；开启“减少动态效果”时使用静态封面且不下载视频。
