'use strict';

const nbFond = 3;


class Router {

  constructor() {
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
    $('#content').load(`/mer-a/html/${path}.html`);
    this.data = data;
    this.#deleteCharacter();
    this.changeFond(change);
  }

  #loadParralax(id) {
    if(id === 1 || id === 2) this.parralax = new Parallax((id === 1) ? this.scene1 : this.scene2);
  }

  #deleteCharacter() {
    const personnage = this.fond.querySelector('#personnage');
    if(personnage !== null) personnage.src = "";
  }

  changeFond(idChange) {
    if(idChange >= 0 && idChange <= nbFond && this.idFond !== idChange) {
      this.idFond = idChange;
      switch (idChange) {
        case 1:
          this.scene1.style.display = 'block';
          this.scene2.style.display = 'none';
          this.fondMer.style.display = 'none';
          this.fond = this.scene1;
          break;

        case 2:
          this.scene1.style.display = 'none';
          this.scene2.style.display = 'block';
          this.fondMer.style.display = 'none';
          this.fond = this.scene2;
          break;

        case 3:
          this.scene1.style.display = 'none';
          this.scene2.style.display = 'none';
          this.fondMer.style.display = 'block';
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
