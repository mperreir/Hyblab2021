'use strict';

(() => {
  loadRessources("accueil", {});
})();

(async () => {
  mapFusion = await (await fetchAsync('/mer-a/assets/data/map.json', 'GET')).json();
  $('#vagues_sound')[0].volume = 0.3;
  $('#vagues_sound')[0].loop = true;
  $('#audio_control').on('click', stopSound)
})();

window.onload = () => {
  $('#loading')[0].style.display = 'none';
}