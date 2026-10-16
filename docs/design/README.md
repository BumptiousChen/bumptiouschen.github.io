# Solaris 首页 · D1 休日手帖

日期：2026-10-16。

## 首页实现更新

根据用户圈选修订，原介绍正文已改为 GitHub、X、B站图标占位；文章区标记为独立模块。Pencil 设计文档已更新，最新导出为 `exports/bi8Au.png`。原 `solaris-homepage-desktop.png` 与 HTML 快照保留作初始设计记录。

Astro 首页与访问路径已实现；主视觉、社交配置、文章区和文章条目分别管理。维护入口见项目 README。首页通过现有 GitHub Pages 工作流发布，并继续支持本地预览。

以 D1 参考图与 `../PRD.md` 为依据，在 Pencil 当前设计文档中绘制桌面首页。画布名为「Solaris · 首页 · D1 休日手帖 · 桌面 1440」，节点 ID 为 `bi8Au`。本次使用设计文档接口编辑、导出并检查设计图片，没有读取桌面屏幕或窗口信息。

## 文件

- `references/D1-homepage.png`：原始方向参考。
- `exports/solaris-homepage-desktop.png`：1440 × 1050 首页预览。
- `exports/solaris-homepage.html`：Pencil 导出的静态布局快照，供视觉交接；尚未接入 Astro 或真实文章数据。
- `assets/hero.png`：独立主视觉插画。
- `assets/game.png`、`assets/anime.png`、`assets/life.png`：独立文章封面插画。

可编辑设计目前位于 Pencil 当前画布；项目内交付的是导出预览、布局快照与独立素材，尚未确认项目路径下存在原生 `.pen` 文件。需要保存原生文件时，可在 Pencil 中另存为 `docs/design/solaris-homepage.pen`，以便后续随项目维护。

## 可修改区域

| 图层分组 | 内容 | 节点 |
| --- | --- | --- |
| 01 品牌与主导航 | 品牌文字、副标、四个导航项 | `W6yM9` |
| 02 主视觉与个人介绍 | 独立主图、引题、标题、正文、了解更多 | `kDybn` |
| 03 最新文章 示例内容 | 区块标题、全部文章入口、三篇图文条目 | `kvkyz` |
| 04 页脚 品牌短句与版权 | 品牌、副标、短句和版权 | `ZRbGP` |

颜色使用 `solaris-bg`、`solaris-ink`、`solaris-muted`、`solaris-accent`、`solaris-rule` 变量。文字、区块与分隔线均为原生图层；插画为可替换的图片填充。文章名称、摘要与日期仅用于视觉排版。

## 素材说明

四张独立插画使用内置 image_gen 工具生成，并保存在 `assets/` 中。提示词见 `image-prompts.md`。

已通过导出图片检查：整体布局、导航对齐、图文比例、文字换行、页脚边界与小字可读性。画布完成后已移除占位标记。
