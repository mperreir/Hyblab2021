'use strict';

(() => {
  document.querySelector('#next').addEventListener('click', () => {
    playSound();
    $('#audio_control')[0].style.display = 'block';
    loadRessources("departements", {}, 3);
  });
  let bool = true;
  document.querySelector('#pause').addEventListener('click', () => {
    stopAnim(bool);
    bool = !bool;
  });
})();
