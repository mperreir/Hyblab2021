'use strict';

(() => {
  if(router.hasData()) {
    document.querySelector('#go-back-div').style.display = "block";
    document.querySelector('#go-back').addEventListener('click', () => {
      router.loadData();
    })
  }
  document.querySelector('#next').addEventListener('click', () => {
    soundManager.playSound();
    router.loadRessources("departements", {}, 3);
    document.querySelector('#scene1').style.filter = 'brightness(100%)';

  });
})();
