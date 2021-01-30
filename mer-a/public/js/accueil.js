'use strict';

(() => {
  document.querySelector('#next').addEventListener('click', () => {
    router.loadRessources("departements", {}, 3);
  });
})();
