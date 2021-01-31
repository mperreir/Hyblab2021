'use strict';

(async () => {
	const path = '/mer-a/assets/img/logo/';
	await getLegendeById(router.data.legende, data => {
		document.querySelector('#personnage-s1').src = `/mer-a/${data.imageURI}`;
		document.querySelector('#personnage-s2').src = `/mer-a/${data.imageURI}`;

		document.querySelector('#nom').innerHTML = data.nom;
		document.querySelector('#bubble').innerHTML = data.histoire;
		document.querySelector('#modal-content').style.background = `url(${data.photo}) center center no-repeat`;
		document.querySelector('#modal-content').style.backgroundSize = 'cover';
		document.querySelector('#title-legende h2').innerHTML = data.nom;
		document.querySelector('#adresse').innerHTML = data.adresse;
		document.querySelector('#googlemaps').addEventListener('click', (event) => {
			const url = `https://maps.google.com/?q=${data.latitude},${data.longitude}`;
			window.open(url, '_blank');
		});
		document.querySelector('#but-credits').addEventListener('click', (event) => {
			router.loadRessources('credits', router.data, (router.data.personnage === 2) ? 2 : 1);
		});
		document.querySelector('#but-back-home').addEventListener('click', (event) => {
			router.loadRessources('accueil', {}, 1);
		});
		initLogo('wc', 'toilettes', data.toilettes);
		initLogo('swim', 'baignade', data.baignade);
		initLogo('food', 'restaurant', data.restaurant);

		function initLogo(id, alt, boolean) {
			const logo = document.querySelector(`#${id}`);
			logo.alt = (boolean) ? alt : `pas de ${alt}`;
			logo.src = (boolean) ? `${path}logo_${id}.png` : `${path}logo_${id}_crossed.png`;
			logo.title = (boolean) ? alt : `pas de ${alt}`;
		}
	});
})();
