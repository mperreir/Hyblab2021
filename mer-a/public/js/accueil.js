'use strict';

(() => {
  document.querySelector('#next').addEventListener('click', () => {
    $('#vagues_sound')[0].play();
    loadRessources("departements", {}, 3);
  });
  let bool = true;
  document.querySelector('#pause').addEventListener('click', () => {
    stopAnim(bool);
    bool = !bool;
  });
})();
