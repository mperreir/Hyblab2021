'use strict';

(() => {
	document.querySelector('#nom').innerHTML = data.nom;
	document.querySelector('#department').innerHTML = data.departement;
	document.querySelector('div#bubble').innerHTML = data.histoire;
	document.querySelector('#categorie').innerHTML = data.categorie;
	document.querySelector('#adresse').innerHTML = data.adresse;
	document.querySelector('#photo').src = data.photo;
	document.querySelector('#googlemaps').addEventListener('click', (event) => {
		const url = `https://maps.google.com/?q=${data.latitude},${data.longitude}`;
		window.open(url, '_blank');
	});
	initLogo('wc', 'toilettes', data.toilettes);
	initLogo('swim', 'baignade', data.baignade);
	initLogo('food', 'restaurant', data.restaurant);

	function initLogo(id, alt, boolean) {
		const logo = document.querySelector(`#${id}`);
		logo.alt = (boolean) ? alt : `pas de ${alt}`;
		logo.src = (boolean) ? `../assets/img/logo/logo_${id}.png` : `../assets/img/logo/logo_${id}_crossed.png`;
		logo.title = (boolean) ? alt : `pas de ${alt}`;
	}
})();
