'use strict';

const router = new Router();

(async () => {
  router.loadRessources("accueil", {});

  let id = 2;
  document.querySelector('#change').addEventListener('click', () => {
    router.changeFond(id);
    id = (id == 2) ? 1 : 2;
  })


  mapFusion = await (await fetchAsync('/mer-a/assets/data/map.json', 'GET')).json();

  $('#vagues_sound')[0].volume = 0.3;
  $('#vagues_sound')[0].loop = true;
  $('#audio_control').on('click', stopSound)

})();

window.onload = () => {
  $('#loading')[0].style.display = 'none';
}

function loading() {
  $('#loading')[0].style.display = 'flex';
}

function stopSound() {
  $('#vagues_sound')[0].pause();
  $('#audio_control')[0].classList = ['inactive'];
  $('#audio_control')[0].innerHTML = 'Activer le son';
  $('#audio_control').on('click', playSound)
}

function playSound() {
  $('#vagues_sound')[0].play();
  $('#audio_control')[0].classList = ['active'];
  $('#audio_control')[0].innerHTML = 'Couper le son';
  $('#audio_control').on('click', stopSound)
}