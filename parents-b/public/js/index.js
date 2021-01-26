// init du slider (qui peut aussi faire des fondus enchainé)
let mySlidr = slidr.create('slidr',{
    breadcrumbs: false,
    controls: 'none',
    fade: false,
    keyboard: false,
    overflow: true,
    timing: { 'linear': '1.5s ease-out' }
  })
    .add('v', ['home-page', 'address-page', 'home-page'], 'linear')
    .add('h', ['address-page', 'age-page', 'access-page', 'address-page'], 'linear')
    .add('v', ['access-page', 'fauna-flora-page', 'access-page'], 'linear')
    .add('h', ['fauna-flora-page', 'activities-page', 'searching-results-page', 'fauna-flora-page'], 'linear')
    .add('v', ['searching-results-page', 'results-page', 'searching-results-page'], 'linear')
    .add('h', ['results-page', 'home-page', 'results-page'], 'fade')
    .start();

// on s'occupe de la 1ère slide
initHome();


// Vérification que tout est bien paramétré
const req = new XMLHttpRequest();
req.open('GET', './js/config/parameters.js', false);
req.send();

if(req.status !== 200){
    alert('Le fichier parameters.js n\'existe pas. Vous devez renommer le fichier sample_parameters.js en parameters.js et le compléter');
}