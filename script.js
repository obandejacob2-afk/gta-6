// script.js — reveal helper and lightweight stubs

// Show elements with the "reveal" class when they enter the viewport
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  const offset = 120; // px from bottom when reveal should trigger

  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top <= (window.innerHeight - offset)) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('load', () => {
  // Run once on load to reveal visible items
  try { revealOnScroll(); } catch (e) { /* ignore */ }

  // Small timeout to reveal elements that may have been added after load
  setTimeout(revealOnScroll, 250);
});

window.addEventListener('scroll', () => {
  try { revealOnScroll(); } catch (e) { /* ignore */ }
});

// Accessibility: reveal all on resize (helps some mobile browsers)
window.addEventListener('resize', () => {
  try { revealOnScroll(); } catch (e) { /* ignore */ }
});

// Lightweight stubs for functions referenced in the HTML so missing script errors don't block behavior
function togglePlay() {
  const v = document.getElementById('gtaVideo');
  if (!v) return;
  if (v.paused) v.play(); else v.pause();
  v.closest('.video-frame')?.classList.toggle('playing', !v.paused);
}

function toggleFullscreen() {
  const v = document.getElementById('gtaVideo');
  if (!v) return;
  if (v.requestFullscreen) v.requestFullscreen();
}

function verifyAccess() {
  // Minimal visual feedback used by the page
  const msg = document.getElementById('verifying-message');
  if (msg) msg.style.display = 'block';
  // Simulate verification then show success popup
  setTimeout(() => {
    if (msg) msg.style.display = 'none';
    const popup = document.getElementById('success-popup');
    if (popup) popup.classList.add('active');
  }, 1500);
}

function openHint() {
  const popup = document.getElementById('hint-popup');
  if (popup) popup.classList.add('active');
}

function closeHint() {
  const popup = document.getElementById('hint-popup');
  if (popup) popup.classList.remove('active');
}

function closeHintOnBackground(e) {
  if (e && e.target && e.target.id === 'hint-popup') closeHint();
}

function continueToPartner() {
  // Example: just show an alert in this demo repo
  try { window.location.href = 'https://example.com'; } catch (e) { alert('Continuing to partner...'); }
}

function closeSuccessPopup() {
  const popup = document.getElementById('success-popup');
  if (popup) popup.classList.remove('active');
}
