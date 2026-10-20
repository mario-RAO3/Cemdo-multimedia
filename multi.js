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

  // Selector de tema: claro, oscuro o automático (sigue al dispositivo)
  (function () {
    var CLAVE = 'cemdo-tema';
    var raiz = document.documentElement;
    var botones = Array.prototype.slice.call(document.querySelectorAll('.tema button'));
    function aplicar(tema) {
      if (tema === 'light' || tema === 'dark') raiz.setAttribute('data-theme', tema);
      else { tema = 'auto'; raiz.removeAttribute('data-theme'); }
      botones.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.tema === tema ? 'true' : 'false'); });
    }
    var guardado = null;
    try { guardado = localStorage.getItem(CLAVE); } catch (e) {}
    aplicar(guardado);
    botones.forEach(function (b) {
      b.addEventListener('click', function () {
        aplicar(b.dataset.tema);
        try { localStorage.setItem(CLAVE, b.dataset.tema); } catch (e) {}
      });
    });
  })();
