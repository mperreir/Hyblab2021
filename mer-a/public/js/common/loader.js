class Loader {
  constructor() {
    this.load = $('#loading');
  }

  hide() {
    this.load.fadeOut('800');
  }

  show() {
    this.load.fadeInt('slow');
  }
}
