 // Botón volver arriba
  document.getElementById('btn-arriba').addEventListener('click', function () {
    window.scrollTo({ top: 0 });
  });

  // Marca en el menú la sección que se está leyendo
  (function () {
    var links = Array.prototype.slice.call(document.querySelectorAll('.menu a'));
    var porId = {};
    links.forEach(function (a) { porId[a.getAttribute('href').slice(1)] = a; });
    function activar(id) {
      links.forEach(function (a) { a.classList.remove('activo'); a.removeAttribute('aria-current'); });
      var a = porId[id];
      if (a) {
        a.classList.add('activo');
        a.setAttribute('aria-current', 'true');
        var ul = a.closest('ul');
        if (window.innerWidth <= 860 && ul) ul.scrollLeft = a.offsetLeft - ul.clientWidth / 2 + a.offsetWidth / 2;
      }
    }
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) { if (e.isIntersecting) activar(e.target.id); });
      }, { rootMargin: '-30% 0px -60% 0px' });
      document.querySelectorAll('main section').forEach(function (s) { obs.observe(s); });
    }
    activar('origenes');
  })();