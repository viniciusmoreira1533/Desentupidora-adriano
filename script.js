// ============================================
// SCROLL ANIMATIONS — Intersection Observer
// ============================================
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.card, .beneficio-item, .timeline-step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  observer.observe(el);
});

document.addEventListener('animationend', () => {}, { once: true });

// Make visible class apply transition
const style = document.createElement('style');
style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

// ============================================
// STAGGER DELAYS para cards e benefícios
// ============================================
document.querySelectorAll('.cards-grid .card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});
document.querySelectorAll('.beneficio-item').forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.1}s`;
});
document.querySelectorAll('.timeline-step').forEach((step, i) => {
  step.style.transitionDelay = `${i * 0.12}s`;
});

// ============================================
// HEADER — esconder/mostrar no scroll
// ============================================
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 80 && currentScroll > lastScroll) {
    header.style.transform = 'translateY(-100%)';
    header.style.transition = 'transform 0.3s ease';
  } else {
    header.style.transform = 'translateY(0)';
  }
  lastScroll = currentScroll;
}, { passive: true });

// ============================================
// UTM — preservar parâmetros UTM nos links WA
// ============================================
(function () {
  const params = new URLSearchParams(window.location.search);
  const utmSource  = params.get('utm_source')  || '';
  const utmMedium  = params.get('utm_medium')  || '';
  const utmCampaign = params.get('utm_campaign') || '';

  if (utmSource || utmMedium || utmCampaign) {
    const utmSuffix = `%0A%0AOrigem%3A%20${utmSource}%20|%20${utmMedium}%20|%20${utmCampaign}`;
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
      link.href = link.href + utmSuffix;
    });
  }
})();

// ============================================
// CONSOLE — info de customização
// ============================================
console.info(
  '%cDesentupidora-adriano%c\nSubstitua 5511999999999 pelo número real de WhatsApp.',
  'color:#25D366;font-weight:bold;font-size:14px;',
  'color:#6B7280;font-size:12px;'
);
