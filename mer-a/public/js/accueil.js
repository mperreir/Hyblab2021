'use strict';

(() => {
  document.querySelector('#next').addEventListener('click', () => {
    loadRessources("departements", {}, 3);
  });
  let bool = true;
  document.querySelector('#pause').addEventListener('click', () => {
    stopAnim(bool);
    bool = !bool;
  });
})();
