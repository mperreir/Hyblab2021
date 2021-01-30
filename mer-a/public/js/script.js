'use strict';

const router = new Router();

(() => {
  router.loadRessources("accueil", {});
  router.loadParralax();

  let id = 2;
  document.querySelector('#change').addEventListener('click', () => {
    router.changeFond(id);
    id = (id == 2) ? 1 : 2;
  })
})();

(async () => {
  mapFusion = await (await fetchAsync('/mer-a/assets/data/map.json', 'GET')).json();
})();
