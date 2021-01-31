'use strict';

(() => {
  document.querySelector('#next').addEventListener('click', () => {
    playSound();
    $('#audio_control')[0].style.display = 'block';
    router.loadRessources("departements", {}, 3);
  });
})();
