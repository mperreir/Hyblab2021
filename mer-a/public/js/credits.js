'use strict';

(() => {
  document.querySelector('#back').addEventListener('click', () => {
    router.loadRessources("legende", {
      legende: router.data.legende
    });
  });
})();
