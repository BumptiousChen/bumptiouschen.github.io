// Edit these normalized coordinates and timings to change the figure's journey.
// The SVG artwork itself lives in src/components/DriftingFigure.astro.
const MOTION = {
  curtainMs: 6000,
  whitePauseMs: 1700,
  descentMs: 8500,
  copyRevealAt: 0.72,
  desktop: { start: [0.91, 0.04], end: [0.23, 0.72] },
  mobile: { start: [0.98, 0.02], end: [0.37, 0.75] },
} as const;

const root = document.documentElement;
const hero = document.querySelector<HTMLElement>('[data-ocean-intro]');
const curtain = hero?.querySelector<SVGSVGElement>('[data-curtain]');
const curtainPath = hero?.querySelector<SVGPathElement>('[data-curtain-path]');
const reveal = hero?.querySelector<SVGSVGElement>('[data-reveal]');
const revealRect = hero?.querySelector<SVGRectElement>('[data-reveal-rect]');
const source = hero?.querySelector<SVGCircleElement>('[data-water-source]');
const front = hero?.querySelector<SVGEllipseElement>('[data-water-front]');
const trails = Array.from(hero?.querySelectorAll<SVGCircleElement>('[data-water-trail]') ?? []);
const figure = hero?.querySelector<HTMLElement>('[data-figure-motion]');
const bubbles = hero?.querySelector<HTMLElement>('[data-bubble-trail]');
const skip = hero?.querySelector<HTMLButtonElement>('[data-skip-intro]');
const replay = hero?.querySelector<HTMLButtonElement>('[data-replay-intro]');

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const ease = (value: number) => 1 - Math.pow(1 - clamp01(value), 3);
const mix = (from: number, to: number, amount: number) => from + (to - from) * amount;

let frame = 0;
let startedAt = 0;

function markSeen() {
  try { sessionStorage.setItem('solaris-intro-seen', '1'); } catch (_) { /* Storage may be disabled. */ }
}

function sizeScene(width: number, height: number) {
  curtain?.setAttribute('viewBox', `0 0 ${width} ${height}`);
  reveal?.setAttribute('viewBox', `0 0 ${width} ${height}`);
  revealRect?.setAttribute('width', String(width));
  revealRect?.setAttribute('height', String(height));
}

function drawCurtain(progress: number, width: number, height: number) {
  if (!curtainPath) return;
  const y = mix(-height * .22, height * 1.22, ease(progress));
  const wave = height * .045 * (1 - progress * .55);
  const path = `M 0 ${y + wave * .4} C ${width * .22} ${y - wave * 1.25}, ${width * .33} ${y + wave * 1.2}, ${width * .52} ${y} S ${width * .82} ${y - wave * .95}, ${width} ${y + wave * .25} L ${width} ${height + 200} L 0 ${height + 200} Z`;
  curtainPath.setAttribute('d', path);
}

function drawDescent(progress: number, width: number, height: number) {
  if (!source || !front || !figure || !bubbles) return;
  const mobile = width <= 600;
  const positions = mobile ? MOTION.mobile : MOTION.desktop;
  const travel = ease(progress);
  const x = mix(positions.start[0], positions.end[0], travel) * width;
  const y = mix(positions.start[1], positions.end[1], travel) * height;
  const diagonal = Math.hypot(width, height);

  // Several overlapping masks make the cobalt flow grow from the figure's path.
  source.setAttribute('cx', String(width * .96));
  source.setAttribute('cy', String(-height * .10));
  source.setAttribute('r', String(diagonal * 1.30 * Math.pow(progress, 1.08)));

  front.setAttribute('cx', String(x));
  front.setAttribute('cy', String(y));
  front.setAttribute('rx', String(Math.min(width, height) * (.06 + .28 * progress)));
  front.setAttribute('ry', String(Math.min(width, height) * (.05 + .23 * progress)));

  trails.forEach((circle, index) => {
    const back = (index + 1) * .16;
    const step = Math.max(0, travel - back);
    circle.setAttribute('cx', String(mix(positions.start[0], positions.end[0], step) * width));
    circle.setAttribute('cy', String(mix(positions.start[1], positions.end[1], step) * height));
    circle.setAttribute('r', String(Math.min(width, height) * (.12 + progress * .25 + index * .035)));
  });

  figure.style.setProperty('--figure-x', `${x}px`);
  figure.style.setProperty('--figure-y', `${y}px`);
  figure.style.setProperty('--figure-rotation', `${mix(-42, -8, travel)}deg`);
  bubbles.style.setProperty('--trail-x', `${x - width * (mobile ? .11 : .02)}px`);
  bubbles.style.setProperty('--trail-y', `${y}px`);
}

function finish(focusLink = false) {
  cancelAnimationFrame(frame);
  markSeen();
  root.classList.remove('intro-prep', 'intro-running', 'is-dropping', 'is-copy-visible');
  curtainPath?.setAttribute('d', '');
  for (const property of ['--figure-x', '--figure-y', '--figure-rotation']) figure?.style.removeProperty(property);
  for (const property of ['--trail-x', '--trail-y']) bubbles?.style.removeProperty(property);
  if (focusLink) hero?.querySelector<HTMLElement>('.hero-link')?.focus();
}

function tick(now: number) {
  if (!hero) return finish();
  const elapsed = now - startedAt;
  const width = hero.clientWidth;
  const height = hero.clientHeight;
  sizeScene(width, height);

  if (elapsed < MOTION.curtainMs) {
    drawCurtain(elapsed / MOTION.curtainMs, width, height);
  } else {
    curtainPath?.setAttribute('d', '');
    const descentStart = MOTION.curtainMs + MOTION.whitePauseMs;
    if (elapsed >= descentStart) {
      root.classList.add('is-dropping');
      const progress = clamp01((elapsed - descentStart) / MOTION.descentMs);
      drawDescent(progress, width, height);
      if (progress >= MOTION.copyRevealAt) root.classList.add('is-copy-visible');
      if (progress >= 1) return finish();
    }
  }
  frame = requestAnimationFrame(tick);
}

function play() {
  cancelAnimationFrame(frame);
  root.classList.add('intro-prep');
  root.classList.remove('is-dropping', 'is-copy-visible');
  if (!hero) return finish();
  sizeScene(hero.clientWidth, hero.clientHeight);
  drawCurtain(0, hero.clientWidth, hero.clientHeight);
  source?.setAttribute('r', '0');
  front?.setAttribute('rx', '0');
  front?.setAttribute('ry', '0');
  trails.forEach((circle) => circle.setAttribute('r', '0'));
  root.classList.add('intro-running');
  startedAt = performance.now();
  frame = requestAnimationFrame(tick);
}

skip?.addEventListener('click', () => finish(true));
replay?.addEventListener('click', play);

if (root.classList.contains('intro-prep')) play();
else finish();
