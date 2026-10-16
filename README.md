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
