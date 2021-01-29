const scene = document.querySelector('#scene');
const parallaxInstance = new Parallax(scene);

async function loadRessources(path, data) {
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
  $('#content').load(`/mer-a/html/${path}.html`);
}
