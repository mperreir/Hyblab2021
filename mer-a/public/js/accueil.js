'use strict';

(() => {
  document.querySelector('#next').addEventListener('click', () => {
    soundManager.playSound();
    router.loadRessources("departements", {}, 3);
  });
})();
