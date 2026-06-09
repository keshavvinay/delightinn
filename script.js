/* Hero parallax */
const heroImg = document.getElementById('hero-img');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y < window.innerHeight * 1.2) {
    heroImg.style.transform = `scale(${1 + y * 0.00022})`;
  }
}, { passive: true });

/* Mood toggle */
function setMood(mode) {
  if (mode === 'night') {
    document.body.classList.add('night-mode');
    document.getElementById('btn-night').classList.add('active');
    document.getElementById('btn-day').classList.remove('active');
  } else {
    document.body.classList.remove('night-mode');
    document.getElementById('btn-day').classList.add('active');
    document.getElementById('btn-night').classList.remove('active');
  }
}

/* Menu overlay */
function openMenu()  { document.getElementById('menu-overlay').classList.add('open'); }
function closeMenu() { document.getElementById('menu-overlay').classList.remove('open'); }

/* Booking drawer */
function openDrawer() {
  document.getElementById('booking-drawer').classList.add('open');
  document.getElementById('booking-bar').setAttribute('aria-expanded', 'true');
  updateWaLink();
}
function closeDrawer() {
  document.getElementById('booking-drawer').classList.remove('open');
  document.getElementById('booking-bar').setAttribute('aria-expanded', 'false');
}
function updateWaLink() {
  const type = document.getElementById('stay-type').value;
  const msg = encodeURIComponent(`Hi, I want to enquire about a ${type} at Delight Inn Stays Kondapur.`);
  document.getElementById('wa-link').href = `https://wa.me/919948311666?text=${msg}`;
}
document.getElementById('stay-type').addEventListener('change', updateWaLink);
updateWaLink();

/* Scroll reveal */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.anim-on-scroll').forEach(el => observer.observe(el));

/* Close on Escape */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeMenu(); closeDrawer(); }
});

/* Google Ads conversion tracking */
function gtag_report_conversion(url) {
  var callback = function () {
    if (typeof(url) != 'undefined') { window.location = url; }
  };
  gtag('event', 'conversion', {
    'send_to': 'AW-11506707477/cYEqCLq02rocEJXY6e4q',
    'value': 1.0,
    'currency': 'INR',
    'event_callback': callback
  });
  return false;
}
