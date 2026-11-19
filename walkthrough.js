const gallery = document.querySelector('.gallery');
const slides = [...gallery.querySelectorAll('.slide')];
const controls = gallery.querySelector('.controls');
const [previous, next] = controls.querySelectorAll('button');
const counter = controls.querySelector('output');
let current = 0;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function startVideo(slide) {
  const video = slide.querySelector('video');
  if (!reducedMotion.matches) {
    // Native controls remain available when the browser blocks autoplay.
    video.play().catch(() => {});
  }
}

function showSlide(direction) {
  const outgoing = slides[current].querySelector('video');
  outgoing.pause();
  outgoing.currentTime = 0;
  slides[current].hidden = true;
  current = (current + direction + slides.length) % slides.length;
  const slide = slides[current];
  slide.hidden = false;
  slide.style.setProperty('--offset', direction > 0 ? '18px' : '-18px');
  slide.classList.add('moving');
  counter.textContent = (current + 1) + ' / ' + slides.length;
  startVideo(slide);
}

slides.slice(1).forEach(slide => { slide.hidden = true; });
controls.hidden = false;
startVideo(slides[current]);
previous.addEventListener('click', () => showSlide(-1));
next.addEventListener('click', () => showSlide(1));
gallery.addEventListener('keydown', event => {
  if (event.target.closest('video')) return;
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    if (document.activeElement.closest('.slide')) gallery.focus();
    showSlide(event.key === 'ArrowLeft' ? -1 : 1);
  }
});
