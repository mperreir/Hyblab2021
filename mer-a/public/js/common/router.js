'use strict';

const nbFond = 3;


class Router {

  constructor(fileAriane, loader) {
    this.fileAriane = fileAriane;
    this.loader = loader;
    this.scene1 = document.querySelector('#scene1');
    this.scene2 = document.querySelector('#scene2');
    this.fondMer = document.querySelector('#fond-mer');
    this.data = {}
    this.fond = this.scene1;
    this.idFond = 1;
    this.stop = false;
    $(`#scene1`).load(`/mer-a/html/fond/parallax1.html`, () => {
      this.#loadParralax(1);
      $(`#scene2`).load(`/mer-a/html/fond/parallax2.html`, () => {
        this.#initAnim();
      });
    });
  }

  loadRessources(path, data, change) {
    $('#content').fadeOut('slow', () => {
      this.changeFond(change);
      $('#content').load(`/mer-a/html/${path}.html`).fadeIn('slow');
    });

    this.data = data;
    this.fileAriane.updateAriane(
      path,
      (deps.get(router.data.department) !== undefined) ? deps.get(router.data.department).nomDepartement : 'departement',
      (getCategorie(router.data.personnage) !== undefined) ? getCategorie(router.data.personnage).nomCategorie : 'personnage',
      'legende'
    );
  }

  #loadParralax(id) {
    if(id === 1 || id === 2) this.parralax = new Parallax((id === 1) ? this.scene1 : this.scene2);
  }

  #deleteCharacter() {
    const personnage = this.fond.querySelector('#personnage');
    if(personnage !== null) personnage.src = "";
  }

  changeFond(idChange) {
    this.#deleteCharacter();
    if(idChange >= 0 && idChange <= nbFond && this.idFond !== idChange) {
      this.idFond = idChange;
      switch (idChange) {
        case 1:
          $('#scene1').fadeIn('slow');
          $('#scene2').fadeOut('slow');
          $('#fond-mer').fadeOut('slow');
          this.fond = this.scene1;
          break;

        case 2:
          $('#scene1').fadeOut('slow');
          $('#scene2').fadeIn('slow');
          $('#fond-mer').fadeOut('slow');
          this.fond = this.scene2;
          break;

        case 3:
        $('#scene1').fadeOut('slow');
        $('#scene2').fadeOut('slow');
          $('#fond-mer').fadeIn('slow');
          break;
      }
      this.#loadParralax(idChange);
    }
  }

  #initAnim() {
    document.querySelectorAll('.vague').forEach((element, index) => {
      element.style.animation = `${element.dataset.animTime}s ${(index % 2 == 0) ? 'waveDown' : 'waveUp'} ease-in-out infinite`;
    });
  }
}
