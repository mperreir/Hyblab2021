'use strict';

class Router {

  constructor(fileAriane, loader) {
    this.fileAriane = fileAriane;
    this.loader = loader;

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

    this.data = {}

    $(this.scene1.elmt).load(`/mer-a/html/fond/parallax1.html`, () => {
      this.loadParralax(1);
      $(this.scene2.elmt).load(`/mer-a/html/fond/parallax2.html`, () => {
        this.initAnim();
      });
    });
  }

  loadRessources(path, data, idFond) {
    if(path === 'accueil') loader.hide();
    // const fond = this.fonds.find(fond => fond.id === idFond);
    // if(fond !== undefined && this.fondActuel !== fond) {
    //   this.loader.show();
    // }
    $('content').fadeOut('slow', () => {
      $('content').load(`/mer-a/html/${path}.html`).fadeIn('slow', () => {
        // this.changeFond(idFond);
      });
    });
    this.deleteCharacter();
    this.data = data;
    this.fileAriane.updateAriane(
        path,
        (deps.get(router.data.department) !== undefined) ? deps.get(router.data.department).nomDepartement : 'Département',
        (getCategorie(router.data.personnage) !== undefined) ? getCategorie(router.data.personnage).nomCategorie : 'Guide',
        'Légende'
      );
  }

  async changeFond(idFond) {
    fond.elmt.style.display = 'block';
    this.fondActuel.style.display = 'none';
    this.loader.hide();
    this.fondActuel = fond;
    console.log(this.fondActuel);
  }


  loadParralax(id) {
    if(id === 1 || id === 2) this.parralax = new Parallax((id === 1) ? this.scene1.elmt : this.scene2.elmt);
  }

  deleteCharacter() {
    if(document.querySelector('#personnage-s1') !== null) {
      document.querySelector('#personnage-s1').src = "";
    }
    if(document.querySelector('#personnage-s2') !== null) {
      document.querySelector('#personnage-s2').src = "";
    }
  }

  initAnim() {
    document.querySelectorAll('.vague').forEach((element, index) => {
      element.style.animation = `${element.dataset.animTime}s ${(index % 2 == 0) ? 'waveDown' : 'waveUp'} ease-in-out infinite`;
    });
  }
}
