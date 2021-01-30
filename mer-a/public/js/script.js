'use strict';

(() => {
  loadRessources("accueil", {});
})();

(async () => {
  mapFusion = await (await fetchAsync('/mer-a/assets/data/map.json', 'GET')).json();
})();

window.onload = () => {
  $('#loading')[0].style.display = 'none';
}