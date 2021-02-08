'use strict';

class Router {

  ROOT = '/mer-a/';
  API_URL = 'api/';
	API_REGIONS_ID = 'all/regions';
	API_TYPES_ID = 'all/types';
	API_LEGENDE = 'legende/';

  constructor(fileAriane, loader, soundManager) {
    this.fileAriane = fileAriane;
    this.loader = loader;
    this.soundManager = soundManager;

    this.scene1 = {
      id: 1,
      name: 'scene1',
      elmt : document.querySelector('#scene1')
    };
    this.scene2 = {
      id: 2,
      name: 'scene2',
      elmt: document.querySelector('#scene2')
    };
    this.fondMer = {
      id: 3,
      name: 'fond-mer',
      elmt: document.querySelector('#fond-mer')
    };
    this.fonds = [this.scene1, this.scene2, this.fondMer];
    this.fondActuel = this.scene1;

    this.data = {};
    this.externData = {};
    this.stop = false;
    this.soundStop = true;

    $(this.scene1.elmt).load(`${this.ROOT}html/fond/parallax1.html`, () => {
      this.loadParralax(1);
      $(this.scene2.elmt).load(`${this.ROOT}html/fond/parallax2.html`, () => {
        this.initAnim();
      });
    });
  }

  loadRessources(path, data, idFond) {
    const fond = this.fonds.find(fond => fond.id === idFond);
    if(fond !== undefined && this.fondActuel !== fond) this.loader.show();
    this.stopAnim();
    if(window["pJSDom"] instanceof Array) for(let pJSD of window["pJSDom"]) 
      pJSD.pJS.fn.vendors.destroypJS();
    window["pJSDom"] = [];

    this.data = data;
    $('#content').fadeOut('slow', () => {
      if(path === 'accueil') document.querySelector('#scene1').style.filter = 'brightness(50%)';
      if(path === 'accueil' || fond !== undefined && this.fondActuel !== fond) loader.hide();
      this.deleteCharacter();
      this.changeFond(idFond);
      $('#content').load(`${this.ROOT}html/${path}.html`).fadeIn('slow', () => {
        if(path === 'departements') {
          this.soundManager.startSound();
        }
        this.fileAriane.updateAriane(
          path,
          (path !== 'departements' && getDepartement(this.data.department) !== undefined) ? getDepartement(this.data.department).nomDepartement : 'Département',
          (path !== 'personnages' && getCategorie(this.data.personnage) !== undefined) ? getCategorie(this.data.personnage).nomCategorie : 'Guide',
          (path !== 'departement' && getLegende(this.data.legende) !== undefined) ? getLegende(this.data.legende).nom : 'Légende',
          'Histoire'
        );
      });

    });
    if(path !== 'accueil') {
      this.saveData(path, data, idFond);
      document.querySelector('.fil_ariane').style.display = "flex";
      document.querySelector('#go-back').style.display = "none";
    }
  }

  saveData(path, data, idFond) {
    if(path !== undefined) {
      localStorage.setItem('path', path);
    }
    if(data !== undefined) {
      localStorage.setItem('data', JSON.stringify(data));
    }
    if(idFond !== undefined) {
      localStorage.setItem('idFond', idFond);
    }
  }

  saveSound() {
    localStorage.setItem('soundStop', this.soundStop);
  }

  hasData() {
    return (localStorage.getItem('path') !== null && localStorage.getItem('data') !== null && localStorage.getItem('idFond') !== null && localStorage.getItem('soundStop')) ? true : false;
  }

  loadData() {
    if(this.hasData()){
      this.loadRessources(localStorage.getItem('path'), JSON.parse(localStorage.getItem('data')), parseInt(localStorage.getItem('idFond'), 10));
      this.soundStop = (localStorage.getItem('soundStop') === 'true');
      this.soundManager.startSound();
      document.querySelector('#scene1').style.filter = 'brightness(100%)';

    }
  }

  loadParralax(id) {
    if(id === 1 || id === 2) this.parralax = new Parallax((id === 1) ? this.scene1 : this.scene2);
  }

  deleteCharacter() {
    if(document.querySelector('#personnage-s1') !== null) {
      document.querySelector('#personnage-s1').src = "";
    }
    if(document.querySelector('#personnage-s2') !== null) {
      document.querySelector('#personnage-s2').src = "";
    }
  }
  //
  changeFond(idFond) {
    const fond = this.fonds.find(fond => fond.id === idFond);
    if(fond !== undefined && this.fondActuel !== fond) {
      $(fond.elmt).fadeIn('slow');
      $(this.fondActuel.elmt).fadeOut('slow');
      this.fondActuel = fond;
      this.loadParralax(idFond);
    }
  }

  stopAnim() {
    this.stop = !this.stop;
    document.querySelectorAll('.vague').forEach(element => {
      element.style.animationPlaySate = (this.stop) ? 'paused' : 'running';
    });
  }

  loadParralax(id) {
    if(id === 1 || id === 2) this.parralax = new Parallax((id === 1) ? this.scene1.elmt : this.scene2.elmt);
  }

  initAnim() {
    document.querySelectorAll('.vague').forEach((element, index) => {
      element.style.animation = `${element.dataset.animTime}s ${(index % 2 == 0) ? 'waveDown' : 'waveUp'} ease-in-out infinite`;
    });
  }
}
