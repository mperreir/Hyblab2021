class Loader {
  constructor() {
    this.load = document.querySelector('#loading');
  }

  hide() {
    this.load.style.display = 'none';
  }

  loading() {
    this.load.style.display = 'flex';
  }

  loaded() {
    setTimeout(() => this.load.style.display = 'none', 1500);
  }
}
