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

var chantiersTrack = document.querySelector('.chantiers-track');
if (chantiersTrack) {
  var prevArrow = document.querySelector('.arrow-prev');
  var nextArrow = document.querySelector('.arrow-next');
  var scrollStep = function () {
    var slide = chantiersTrack.querySelector('.chantier-slide');
    return slide ? slide.getBoundingClientRect().width + 24 : 300;
  };
  if (prevArrow) {
    prevArrow.addEventListener('click', function () {
      chantiersTrack.scrollBy({ left: -scrollStep(), behavior: 'smooth' });
    });
  }
  if (nextArrow) {
    nextArrow.addEventListener('click', function () {
      chantiersTrack.scrollBy({ left: scrollStep(), behavior: 'smooth' });
    });
  }
}
