'use strict';

const loader = new Loader();
const filAriane = new FilAriane();
const soundManager = new SoundManager();
const router = new Router(filAriane, loader, soundManager);

(async () => {
  router.loadRessources("accueil", {}, 1);
  mapFusion = await (await fetchAsync('/mer-a/assets/data/map.json', 'GET')).json();
})();
