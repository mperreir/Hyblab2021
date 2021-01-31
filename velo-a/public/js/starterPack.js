"use strict";

import { getAirQuality } from "./modules/qualiteAir.js";
import { getMeteo } from "./modules/meteo.js";

window.addEventListener('DOMContentLoaded', async () => {

	const { alerts, hourly, daily } = await getMeteo();
	const meteoHeure = hourly[0];
	const { sunrise, sunset } = daily[0];

	console.log(alerts, meteoHeure);

	// - Un t-shirt; des lunettes de soleil; de la crème solaire; une
	// 		casquette (chaud) - Un bonnet; des gants; une écharpe (Froid) - Une veste; un pull (ensolleilé) <br><br> - Un
	// 		vêtement de pluie (en + avec la pluie)

	//	N’oublie surtout pas ton casque et pense à un antivol pour
	// 		protéger ton vélo.

	const fluiditeTrajet = localStorage.getItem("fluiditeTrajet");
	const distanceTrajet = localStorage.getItem("distanceTrajet");
	const dureeTrajet = localStorage.getItem("dureeTrajet");

	const heureArrive = new Date(Date.now() + dureeTrajet * 1000);

	if (Date.now() / 1000 < sunrise)
		console.log("N'oublie pas de prendre tes lampes de vélo !");
	if (heureArrive / 1000 > sunset - 600)
		console.log("N'oublie pas de prendre tes lampes de vélo !");

	document.getElementById("traffic").innerText = `- Fuidité du traffic : ${fluiditeTrajet} \n` +
		`- DistanceTrajet : ${(distanceTrajet / 1000).toFixed(2)}km \n` +
		`- Durée trajet : ${Math.round(dureeTrajet / 60)} minutes \n` +
		`- En partant maintenant nous arriverez à ${heureArrive.toLocaleTimeString("fr-FR")}`;
//		- La route est dégagée, à fond les pédales - Bouchons sur ton trajet, gardes-en sous la pédale

	const airQuality = await getAirQuality();

	let textQualiteAir = "";
	switch (airQuality) {
		case "très bon":
			textQualiteAir = "- La qualité de l'air est très bonne !"
			break;
		case "bon":
			textQualiteAir = "- La qualité de l'air est bonne !"
			break;
		default:
		case "moyen":
			textQualiteAir = "- La qualité de l'air est moyenne !"
			break;
		case "degradé":
			textQualiteAir = "- La qualité de l'air est degradée !"
			break;
		case "mauvais":
			textQualiteAir = "- La qualité de l'air est mauvaise !"
			break;
		case "très mauvais":
			textQualiteAir = "- La qualité de l'air est très mauvaise !"
			break;
		case "extrêmement mauvais":
			textQualiteAir = "- La qualité de l'air est extrêmement mauvaise !"
			break;
	}

	document.getElementById("qualiteAir").innerText = textQualiteAir;


	let messageFin;

	if (false) {
		messageFin = "Fais attention aux coups de soleil !"
	} else if (false) {
		messageFin = "Bon courage, tu vas en avoir besoin !"
	} else if (false) {
		messageFin = "Attention, ça va glisser !"
	} else if (false) {
		messageFin = "Garde la tête froide !"
	} else {
		messageFin = "Sur ce, bonne route !"
	}

	document.getElementById("messageFin").innerText = messageFin;

});

