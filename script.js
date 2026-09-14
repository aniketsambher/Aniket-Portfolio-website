// Theme toggle — remembers the choice, otherwise follows the OS setting.
(function () {
  var root = document.documentElement;
  var saved = localStorage.getItem('theme');
  var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  root.setAttribute('data-theme', saved || (prefersLight ? 'light' : 'dark'));

  document.getElementById('themeToggle').addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();

// Highlight the nav link for whichever section is currently on screen.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));
  var sections = links
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  if (!('IntersectionObserver' in window) || !sections.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (link) {
        link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
      });
    });
  }, { rootMargin: '-50% 0px -45% 0px' });

  sections.forEach(function (section) { observer.observe(section); });
})();

document.getElementById('year').textContent = new Date().getFullYear();
