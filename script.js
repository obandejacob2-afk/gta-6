document.addEventListener('DOMContentLoaded', () => {
  initRevealOnScroll();
  initNavbarScroll();
  initVideoControls();
});

function initRevealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('active'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        io.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px', threshold: 0.12 });

  reveals.forEach(el => io.observe(el));
}

function initNavbarScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const onScroll = () => {
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', throttle(onScroll, 100));
}

function throttle(fn, wait) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
    }
  };
}

function verifyAccess() {
  const input = document.getElementById('access-code');
  const form = document.getElementById('access-form');
  const verifyingMsg = document.getElementById('verifying-message');
  
  if (!input || !form) return;

  const code = input.value.trim();
  if (code.toUpperCase() === 'GTA6-LAUNCH') {
    form.style.display = 'none';
    if (verifyingMsg) verifyingMsg.style.display = 'block';
    
    setTimeout(() => {
      if (verifyingMsg) verifyingMsg.style.display = 'none';
      showPremiumPopup();
    }, 5000);
  } else {
    input.classList.add('invalid');
    input.focus();
    setTimeout(() => input.classList.remove('invalid'), 800);
  }
}

function showPremiumPopup() {
  const popup = document.getElementById('success-popup');
  if (!popup) return;
  
  popup.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSuccessPopup() {
  const popup = document.getElementById('success-popup');
  if (!popup) return;
  
  popup.classList.remove('active');
  document.body.style.overflow = '';
  
  const noticeSection = document.getElementById('notice');
  if (noticeSection) {
    setTimeout(() => {
      noticeSection.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }
}

function openHint() {
  const popup = document.getElementById('hint-popup');
  if (!popup) return;
  popup.classList.add('active');
}

function closeHint() {
  const popup = document.getElementById('hint-popup');
  if (!popup) return;
  popup.classList.remove('active');
}

function closeHintOnBackground(e) {
  if (e && e.target && e.currentTarget && e.target === e.currentTarget) {
    closeHint();
  }
}

function continueToPartner() {
  const url = 'https://unlock-content.site/sl/65pd8';
  try {
    window.open(url, '_blank', 'noopener');
  } catch (err) {
    window.location.href = url;
  }
}

function initVideoControls() {
  const video = document.getElementById('gtaVideo');
  const frame = document.querySelector('.video-frame');
  const overlay = document.querySelector('.play-overlay');
  if (!video || !frame) return;

  function togglePlay() {
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }

  video.addEventListener('play', () => frame.classList.add('playing'));
  video.addEventListener('pause', () => frame.classList.remove('playing'));
  video.addEventListener('ended', () => frame.classList.remove('playing'));

  if (overlay) overlay.addEventListener('click', togglePlay);
  video.addEventListener('click', togglePlay);
}

window.verifyAccess = verifyAccess;
window.openHint = openHint;
window.closeHint = closeHint;
window.closeHintOnBackground = closeHintOnBackground;
window.closeSuccessPopup = closeSuccessPopup;
window.continueToPartner = continueToPartner;
window.toggleFullscreen = function() {
  const video = document.getElementById('gtaVideo');
  if (!video) return;
  if (video.requestFullscreen) video.requestFullscreen();
  else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
};