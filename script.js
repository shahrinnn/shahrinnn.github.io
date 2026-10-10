const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();
const observed = document.querySelectorAll('main section[id]');
if ('IntersectionObserver' in window) {
  const navObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      nav.querySelectorAll('a[href^="#"]').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    });
  }, {rootMargin:'-28% 0px -64% 0px'});
  observed.forEach(section => navObs.observe(section));
}

// Accessible project category filtering.
const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('.project-card[data-category]');
const projectCount = document.querySelector('.filter-count');
filterButtons.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  filterButtons.forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
  let count = 0;
  projectCards.forEach(card => { const show = category === 'all' || card.dataset.category.split(' ').includes(category); card.hidden = !show; if (show) count++; });
  if (projectCount) projectCount.textContent = `Showing ${count} ${count === 1 ? 'project' : 'projects'}`;
}));
// Copy email. Works on HTTPS and localhost, with a manual fallback for file previews.
const copyEmail = document.getElementById('copy-email');
const feedback = document.getElementById('copy-feedback');
if (copyEmail) copyEmail.addEventListener('click', async () => {
  const email = 'shahrinnuha4626@gmail.com';
  try {
    if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(email);
    feedback.textContent = 'Email copied to clipboard.';
  } catch {
    feedback.textContent = `Copy manually: ${email}`;
  }
});
// Gentle scroll reveals. Content remains visible on unsupported browsers.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealTargets = document.querySelectorAll('.project-card, .timeline-item, .skill-panel, .about-grid, .credentials-list');
  document.body.classList.add('js-reveal');
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
  }), { threshold: 0.08, rootMargin: '0px 0px 30px 0px' });
  revealTargets.forEach(el => { el.classList.add('reveal-item'); revealObserver.observe(el); });
}
