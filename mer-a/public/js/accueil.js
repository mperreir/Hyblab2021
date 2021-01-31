'use strict';

(() => {
  document.querySelector('#next').addEventListener('click', () => {
    soundManager.playSound();
    router.loadRessources("departements", {}, 3);
    document.querySelector('#scene1').style.filter = 'brightness(100%)';

  });
})();
