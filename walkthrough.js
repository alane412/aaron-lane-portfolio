const gallery = document.querySelector('.gallery');
const slides = [...gallery.querySelectorAll('.slide')];
const controls = gallery.querySelector('.controls');
const [previous, next] = controls.querySelectorAll('button');
const counter = controls.querySelector('output');
let current = 0;

function showSlide(direction) {
  slides[current].hidden = true;
  current = (current + direction + slides.length) % slides.length;
  const slide = slides[current];
  slide.hidden = false;
  slide.style.setProperty('--offset', direction > 0 ? '18px' : '-18px');
  slide.classList.add('moving');
  counter.textContent = (current + 1) + ' / ' + slides.length;
}

slides.slice(1).forEach(slide => { slide.hidden = true; });
controls.hidden = false;
previous.addEventListener('click', () => showSlide(-1));
next.addEventListener('click', () => showSlide(1));
gallery.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    if (document.activeElement.closest('.slide')) gallery.focus();
    showSlide(event.key === 'ArrowLeft' ? -1 : 1);
  }
});
