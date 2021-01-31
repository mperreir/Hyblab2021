'use strict';

(() => {
  document.querySelector('#back').addEventListener('click', () => {
    router.loadRessources("legende", router.data);
  });
})();
