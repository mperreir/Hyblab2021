'use strict';

const scene = document.querySelector('#scene');
const parralax = new Parallax(scene);

function loading() {
  $('#loading')[0].style.display = 'flex';
}

// 0 = rien faire | 1 = fond 1 | 2 = fond 2 | 3 = fond mer
let fond = 1;
async function loadRessources(path, data, change) {
  loading();
  if('legende' in data) {
    document.querySelector('#content').dataset.legende = data.legende;
  }
  if('department' in data) {
    document.querySelector('#content').dataset.department = data.department;
  }
  if('personnage' in data) {
    document.querySelector('#content').dataset.personnage = data.personnage;
  }
  document.querySelector('#content').dataset.idLegende = data;
  document.querySelector('#personnage').src = "";
  loadFond(change);
  $('#content').load(`/mer-a/html/${path}.html`, () => {
    $('#loading')[0].style.display = 'none';
  });
}

function stopAnim(bool) {
  document.querySelectorAll('#scene img.bg').forEach(element => {
    element.classList.remove((bool) ? 'encours' : 'arret');
    element.classList.add((bool) ? 'arret' : 'encours');
  });
  (bool) ? parralax.disable() : parralax.enable();
}

// 0 = rien faire | 1 = fond 1 | 2 = fond 2 | 3 = fond mer
function loadFond(change) {
  if(change !== 0 && fond !== change) {
    if(change === 1) {
      document.querySelector('#scene').style.display = 'block';
      document.querySelector('#fond-mer').style.display = 'none';
    }
    // if(change === 2) {
    //   document.querySelector('#scene').style.display = 'block';
    //   document.querySelector('#fond-mer').style.display = 'none';
    // }
    if(change === 3) {
      document.querySelector('#scene').style.display = 'none';
      document.querySelector('#fond-mer').style.display = 'block';
    }
    fond = change;
  }
}
