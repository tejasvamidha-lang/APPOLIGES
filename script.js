const noButton = document.querySelector('#noButton');
const yesButton = document.querySelector('#yesButton');
const thankYou = document.querySelector('#thankYou');
const closeThankYou = document.querySelector('#closeThankYou');
const confettiContainer = document.querySelector('#confettiContainer');

function moveNoButton() {
  const buttonWidth = noButton.offsetWidth;
  const buttonHeight = noButton.offsetHeight;
  const padding = 18;
  const maxX = Math.max(padding, window.innerWidth - buttonWidth - padding);
  const maxY = Math.max(padding, window.innerHeight - buttonHeight - padding);
  noButton.style.position = 'fixed';
  noButton.style.left = `${Math.floor(Math.random() * maxX)}px`;
  noButton.style.top = `${Math.floor(Math.random() * maxY)}px`;
  noButton.style.zIndex = '12';
}

noButton.addEventListener('mouseenter', moveNoButton);
noButton.addEventListener('pointerdown', (event) => {
  event.preventDefault();
  moveNoButton();
});

function makeConfetti() {
  const colors = ['#eec6c2', '#b85d63', '#e6c6a4', '#fffaf7', '#752f3e'];
  const pieces = 120;
  for (let index = 0; index < pieces; index += 1) {
    const piece = document.createElement('i');
    piece.className = 'confetti';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = colors[index % colors.length];
    piece.style.animationDelay = `${Math.random() * 1.5}s`;
    piece.style.animationDuration = `${2.8 + Math.random() * 2.2}s`;
    piece.style.setProperty('--drift', `${-140 + Math.random() * 280}px`);
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    confettiContainer.appendChild(piece);
  }
}

function showThankYou() {
  makeConfetti();
  thankYou.classList.add('is-visible');
  thankYou.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  const phoneNumber = '919117865343';
  const message = encodeURIComponent('She clicked “Yes, I do” on your apology website. ❤️');
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
}

function closeOverlay() {
  thankYou.classList.remove('is-visible');
  thankYou.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  window.setTimeout(() => { confettiContainer.replaceChildren(); }, 400);
}

yesButton.addEventListener('click', showThankYou);
closeThankYou.addEventListener('click', closeOverlay);
thankYou.addEventListener('click', (event) => {
  if (event.target === thankYou) closeOverlay();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && thankYou.classList.contains('is-visible')) closeOverlay();
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
