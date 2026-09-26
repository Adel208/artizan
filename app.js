(function () {
  document.querySelectorAll('.reveal').forEach(function (el) {
    var siblings = Array.prototype.filter.call(el.parentElement.children, function (c) {
      return c.classList.contains('reveal');
    });
    var index = siblings.indexOf(el);
    el.style.transitionDelay = Math.min(index * 90, 360) + 'ms';
  });

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -10% 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
})();

var burger = document.querySelector('.burger');
if (burger) {
  burger.addEventListener('click', function () {
    document.querySelector('header.main').classList.toggle('is-open');
  });
}

document.querySelectorAll('[data-faq]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var item = btn.closest('.faq-item');
    var wasOpen = item.classList.contains('is-open');
    document.querySelectorAll('.faq-item').forEach(function (i) {
      i.classList.remove('is-open');
      i.querySelector('.sign').textContent = '+';
    });
    if (!wasOpen) {
      item.classList.add('is-open');
      item.querySelector('.sign').textContent = '−';
    }
  });
});

document.querySelectorAll('[data-chantier]').forEach(function (card) {
  var buttons = card.querySelectorAll('.chantier-toggle button');
  var images = card.querySelectorAll('.chantier-media img');
  var tag = card.querySelector('.chantier-tag');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var state = btn.getAttribute('data-show');
      buttons.forEach(function (b) { b.classList.toggle('is-active', b === btn); });
      images.forEach(function (img) {
        img.classList.toggle('is-active', img.getAttribute('data-state') === state);
      });
      tag.textContent = state === 'avant' ? 'Avant' : 'Après';
    });
  });
});
