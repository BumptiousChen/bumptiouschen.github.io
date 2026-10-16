# Persona 3 Reload homepage media

Source: https://asia.sega.com/p3r/cn/ (retrieved 2026-10-16).
Artwork and video: © ATLUS © SEGA. These are third-party assets, not original Solaris artwork.

All source paths below are relative to `https://asia.sega.com/p3r/cn/resources/img/`:

| Local file | Original path |
|---|---|
| opening-desktop.mp4 | top/fv_movie1_bef3ec38c6b4ba869207fc85cf95bc78.mp4 |
| loop-desktop.mp4 | top/fv_movie2_1aaf21a0de60678450744da0dbaf9ef4.mp4 |
| opening-mobile.mp4 | sp/top/fv_movie1_29d27123eb72c13ff6989a6b27d9254d.mp4 |
| loop-mobile.mp4 | sp/top/fv_movie2_52dc5fe4e1e1e0d4986c75a132ec97c0.mp4 |
| hologram-desktop.webp | top/fv_hologram_101de2751e0571141cd333e9e0fcc3ff.webp |
| hologram-mobile.webp | sp/top/fv_hologram_745035c1dff1dcd9705c23454a935a45.webp |

`poster-desktop.webp` and `poster-mobile.webp` are frames extracted at 1 second from the respective loop video using the browser video decoder and canvas, exported at quality 0.88 (960×540 / 540×960). They are used for no-JavaScript, reduced-motion, loading, and autoplay failure states.

The video and image URLs are configured in `src/components/OceanMedia.astro`. They are served locally, and only the viewport-appropriate pair of videos is loaded. The original site's P3R logo, purchase links, tracking scripts, and modal scripts are not included.
