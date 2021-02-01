'use strict';

(() => {
  document.querySelector('.fil_ariane').style.display = "none";
  if(router.hasData()) {
    document.querySelector('#go-back').style.display = "block";
    document.querySelector('#go-back').addEventListener('click', () => {
      router.loadData();
    })
  }
  particlesJS.load('particles-js', 'assets/data/particles_persos.json', ()=>{});
  document.querySelector('#next').addEventListener('click', () => {
    router.loadRessources("departements", {}, 3);
    document.querySelector('#scene1').style.filter = 'brightness(100%)';

  });
})();
