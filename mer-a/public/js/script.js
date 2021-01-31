'use strict';

const loader = new Loader();
const filAriane = new FilAriane();
const soundManager = new SoundManager();
const router = new Router(filAriane, loader);

(async () => {
  router.loadRessources("accueil", {}, 1);
  // to remove
  let id = 2;
  document.querySelector('#change').addEventListener('click', () => {
    router.changeFond(id);
    id = (id == 2) ? 1 : 2;
  })

  mapFusion = await (await fetchAsync('/mer-a/assets/data/map.json', 'GET')).json();
})();
