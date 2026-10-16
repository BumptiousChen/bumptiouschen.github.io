// P3R sequence: wave → video → hologram → copy → navigation.
export {};
const MOTION = { waveAt: 2000, sceneAt: 4000, hologramAt: 5000, copyAt: 5800, detailsAt: 6400, completeAt: 8000 } as const;
const root = document.documentElement;
const hero = document.querySelector<HTMLElement>('[data-ocean-intro]');
const opening = hero?.querySelector<HTMLVideoElement>('[data-hero-opening]') ?? undefined;
const looping = hero?.querySelector<HTMLVideoElement>('[data-hero-loop]') ?? undefined;
const skip = hero?.querySelector<HTMLButtonElement>('[data-skip-intro]');
const replay = hero?.querySelector<HTMLButtonElement>('[data-replay-intro]');
const toggle = hero?.querySelector<HTMLButtonElement>('[data-toggle-background]');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const mobile = matchMedia('(max-width: 750px)');
let timers: ReturnType<typeof setTimeout>[] = [];
let active: HTMLVideoElement | undefined;
let revision = 0;
let userPaused = false;
let mediaMode = '';
let playingIntro = false;

function cancelSequence() {
  revision++;
  timers.forEach(clearTimeout);
  timers = [];
}
function markSeen() {
  try { sessionStorage.setItem('solaris-p3r-intro-seen', '1'); } catch { /* Storage is optional. */ }
}
function updateToggle() {
  if (!toggle) return;
  const paused = !active || active.paused;
  toggle.textContent = paused ? '播放背景 ▷' : '暂停背景 Ⅱ';
  toggle.setAttribute('aria-label', paused ? '播放背景视频' : '暂停背景视频');
}
function prepareMedia() {
  const nextMode = mobile.matches ? 'mobile' : 'desktop';
  if (nextMode === mediaMode) return;
  mediaMode = nextMode;
  hero?.classList.remove('media-ready');
  for (const video of [opening, looping]) {
    if (!video) continue;
    video.pause();
    video.preload = 'auto';
    video.src = video.dataset[nextMode] ?? '';
    video.load();
  }
}
async function showVideo(video: HTMLVideoElement | undefined) {
  if (!video) return;
  active = video;
  if (userPaused || reducedMotion.matches || document.hidden) { updateToggle(); return; }
  const currentRevision = revision;
  try {
    await video.play();
    // Ignore a play promise that resolves after skip, replay or a media switch.
    if (currentRevision !== revision) {
      if (active !== video) video.pause();
      return;
    }
    if (active !== video || userPaused || reducedMotion.matches || document.hidden) {
      video.pause();
      return;
    }
    hero?.classList.add('media-ready');
    hero?.classList.toggle('show-opening', video === opening);
  } catch { /* Keep the responsive poster if autoplay or loading fails. */ }
  updateToggle();
}
function revealUI() {
  hero?.classList.add('scene-visible', 'hologram-visible', 'copy-visible', 'details-visible');
}
function finishIntro() {
  playingIntro = false;
  root.classList.remove('intro-prep');
  root.classList.add('intro-details-visible');
  hero?.classList.remove('wave-running');
  revealUI();
  markSeen();
}
function showFinal(focusLink = false) {
  cancelSequence();
  opening?.pause();
  finishIntro();
  if (!reducedMotion.matches) prepareMedia();
  void showVideo(looping);
  if (focusLink) hero?.querySelector<HTMLElement>('.hero-link')?.focus();
}
function playIntro() {
  if (!hero || !opening || !looping || reducedMotion.matches) return showFinal();
  cancelSequence(); prepareMedia();
  opening.pause(); looping.pause();
  opening.currentTime = 0; looping.currentTime = 0;
  active = opening; userPaused = false; playingIntro = true;
  hero.classList.remove('wave-running', 'scene-visible', 'hologram-visible', 'copy-visible', 'details-visible', 'media-ready');
  hero.classList.add('show-opening');
  root.classList.add('intro-prep');
  root.classList.remove('intro-details-visible');
  const later = (callback: () => void, delay: number) => timers.push(setTimeout(callback, delay));
  // Flush the reset styles so a replay starts the same CSS transition.
  void hero.offsetWidth;
  later(() => hero.classList.add('wave-running'), MOTION.waveAt);
  later(() => { hero.classList.add('scene-visible'); void showVideo(opening); }, MOTION.sceneAt);
  later(() => hero.classList.add('hologram-visible'), MOTION.hologramAt);
  later(() => hero.classList.add('copy-visible'), MOTION.copyAt);
  later(() => { hero.classList.add('details-visible'); root.classList.add('intro-details-visible'); }, MOTION.detailsAt);
  later(finishIntro, MOTION.completeAt);
  updateToggle();
}
opening?.addEventListener('ended', () => void showVideo(looping));
for (const video of [opening, looping]) {
  if (!video) continue;
  video.addEventListener('play', updateToggle);
  video.addEventListener('pause', updateToggle);
  video.addEventListener('error', () => {
    if (video !== active) return;
    if (video === opening) showFinal();
    else { hero?.classList.remove('media-ready'); video.pause(); updateToggle(); }
  });
}
skip?.addEventListener('click', () => showFinal(true));
replay?.addEventListener('click', playIntro);
toggle?.addEventListener('click', () => {
  if (!active) active = looping;
  if (!active) return;
  userPaused = !active.paused;
  if (userPaused) active.pause();
  else { prepareMedia(); void showVideo(active); }
  updateToggle();
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (playingIntro) showFinal();
    active?.pause();
  } else if (!userPaused && !reducedMotion.matches) void showVideo(active);
});
reducedMotion.addEventListener('change', () => {
  userPaused = false; showFinal();
  if (reducedMotion.matches) {
    opening?.pause(); looping?.pause(); hero?.classList.remove('media-ready');
  }
});
mobile.addEventListener('change', () => {
  if (!reducedMotion.matches) { mediaMode = ''; showFinal(); }
});
if (hero) {
  root.classList.add('hero-enhanced');
  if (root.classList.contains('intro-prep') && !reducedMotion.matches) playIntro();
  else showFinal();
}
