'use strict';

(() => {
  document.querySelector('#back').addEventListener('click', () => {
    router.loadRessources("legende", router.data, (router.data.personnage === 2) ? 2 : 1);
  });
})();
