// init du slider (qui peut aussi faire des fondus enchainé)
let mySlidr = slidr.create('slidr',{
    breadcrumbs: false,
    controls: 'none',
    fade: false,
    keyboard: false,
    overflow: true,
    timing: { 'linear': '1.2s ease-out' }
})

    .add('v', ['home-page','address-page'], 'linear')
    .add('v', ['more-infos-page','home-page'], 'linear')
    .add('h', ['home-page', 'histoire-page', 'home-page'], 'linear')
    .add('h', ['histoire-page', 'home-page', 'histoire-page'], 'linear')
    .add('v', ['more-infos-page', 'home-page', 'more-infos-page'], 'linear')

    .add('h', ['age-page', 'home-page', 'age-page'], 'linear')
    .add('h', ['address-page', 'hour-page', 'age-page', 'access-page', 'address-page'], 'linear')
    .add('v', ['access-page', 'fauna-flora-page', 'access-page'], 'linear')
    .add('v', ['fauna-flora-page', 'access-page','fauna-flora-page'], 'linear')
    .add('h', ['fauna-flora-page','activities-page', 'searching-results-page', 'fauna-flora-page'], 'linear')
    .add('v', ['searching-results-page', 'results-page', 'searching-results-page'], 'linear')
    .add('h', ['results-page', 'credits-page', 'results-page'], 'linear')
    .add('v', ['address-page', 'activities-page', 'address-page'], 'fade')
    .start();

// on s'occupe de la 1ère slide
muteAll();
setTimeout(function (){
    initHome();
}, 6200);


// Vérification que tout est bien paramétré
const req = new XMLHttpRequest();
req.open('GET', './js/config/parameters.js', false);
req.send();

if(req.status !== 200){
    alert('Le fichier parameters.js n\'existe pas. Vous devez renommer le fichier sample_parameters.js en parameters.js et le compléter');
}
