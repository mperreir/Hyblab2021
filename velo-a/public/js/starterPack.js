"use strict";

import { getAirQuality } from "./modules/qualiteAir.js";
import { getMeteo } from "./modules/meteo.js";

window.addEventListener('DOMContentLoaded', async () => {

	const [meteo, airQuality] = await Promise.all([getMeteo(), getAirQuality()]);
	const { alerts, hourly, daily } = meteo;

	const { temp: temperature, weather, pop, feels_like } = hourly[0];
	const { sunrise, sunset } = daily[0];

	const fluiditeTrajet = localStorage.getItem("fluiditeTrajet");
	const distanceTrajet = localStorage.getItem("distanceTrajet");
	const dureeTrajet = localStorage.getItem("dureeTrajet");

	const heureArrive = new Date(Date.now() + dureeTrajet * 1000);

	////////////// Instructions début //////////////

	let textInstructions = "";
	// - Un t-shirt; des lunettes de soleil; de la crème solaire; une
	// 		casquette (chaud) - Un bonnet; des gants; une écharpe (Froid) - Une veste; un pull (ensolleilé) <br><br> - Un
	// 		vêtement de pluie (en + avec la pluie)

	if (temperature > 20)
		textInstructions += "- Un t-shirt; des lunettes de soleil; de la crème solaire. \n";
	else if (temperature > 20)
		textInstructions += "- Une veste; un pull. \n";
	else
		textInstructions += "- Un bonnet; des gants; une écharpe. \n";

	const pluie = weather && weather.some(e => e.description.includes("pluie"));
	const alerteGrave = alerts && alerts.some(e => e.event.includes("Severe"));

	if (pluie)
		textInstructions += "- Un vêtement de pluie. \n";

	if (alerteGrave)
		textInstructions += "Météo France signale que des phénomènes dangereux d'intensité exceptionnelle sont en cours, ne prends le vélo que pour motif impérieux.\n ";

	if (Date.now() / 1000 < sunrise)
		textInstructions += "Il semblerait que tu partes de nuit, pense à prendre le nécessaire pour être visible sur la route. ";
	else if (heureArrive / 1000 > sunset - 600)
		textInstructions += "Il semblerait que tu rentres de nuit, pense à prendre le nécessaire pour être visible sur la route. ";

	if (localStorage.getItem("velo") === "bicloo")
		textInstructions += "N’oublie surtout pas ton casque. "
	else
		textInstructions += "N’oublie surtout pas ton casque et pense à un antivol pour protéger ton vélo. "

	document.getElementById("instruction").innerText = textInstructions;

	////////////// Météo //////////////

	let textMeteo = "";

	textMeteo += `- Température : ${temperature}°C \n` +
		`- Température ressentie : ${feels_like}°C \n`;

	if (pop) {
		textMeteo += `- Probabilité de précipitation : ${pop * 100}% \n`;
	}
	if (weather && weather.length > 0) {
		textMeteo += `- Météo de la prochaine heure : `;
		weather.forEach((e, i, l) => {
			textMeteo += `${e.description}`;
			if (l.length - 1 !== i)
				textMeteo += ",";
		});
		textMeteo += "\n";
	}

	document.getElementById("meteo").innerText = textMeteo;

	////////////// Trafic //////////////

	const typeVelo = localStorage.getItem("velo");

	let calories;
	if (typeVelo === "electrique") {
		calories = 3.5 * (dureeTrajet / 60);
	} else {
		calories = 8 * (dureeTrajet / 60);
	}

	document.getElementById("sante").innerText = `- Tu vas dépenser environ ${Math.round(calories)} calories lors de ce vélotrajet !`;

	////////////// Trafic //////////////

	let textTraffic = "";
	if (fluiditeTrajet === "Fluide")
		textTraffic += "- La route est dégagée, à fond les pédales !\n"
	else
		textTraffic += "- Bouchons sur ton trajet, gardes-en sous la pédale !\n"

	textTraffic += `- Distance du trajet : ${(distanceTrajet / 1000).toFixed(2)}km \n` +
		`- Durée du trajet : ${Math.round(dureeTrajet / 60)} minutes \n` +
		`- En partant maintenant, tu arriveras à ${heureArrive.toLocaleTimeString("fr-FR")}`;

	document.getElementById("traffic").innerText = textTraffic;

	////////////// Qualité de l'air //////////////

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

	////////////// Message fin //////////////

	let messageFin;

	if (temperature > 20 && !pluie) { // Si soleil
		document.getElementById("bicky-habille").src = "img/mascottes/styleMeteo/mascotte_soleil.svg"
		messageFin = "C’est un temps idéal pour faire du vélo !";
	} else if (pluie) { // Si pluie
		document.getElementById("bicky-habille").src = "img/mascottes/styleMeteo/mascotte_pluie.svg"
		document.getElementById("bicky-habille").className = "bicky-habille-pluie";
		messageFin = "Même s’il fait gris, prends ton vélo pour garder la pêche !";
	} else if (temperature <= 3 || alerteGrave) { // Si verglas ou alerte Météo France grave
		document.getElementById("bicky-habille").src = "img/mascottes/styleMeteo/mascotte_alerte.svg"
		messageFin = "Fais bien attention et ne prend pas de risque inconsidéré !";
	} else if (temperature <= 13) { // Si froid
		document.getElementById("bicky-habille").src = "img/mascottes/styleMeteo/mascotte_froid.svg"
		messageFin = "Un peu de vélo pour rester chaud !";
	} else {
		messageFin = "Sur ce, bonne route !"
	}

	document.getElementById("messageFin").innerText = messageFin;

	let bickySavoir = document.getElementById("container-bicky");

	document.getElementById("button-question").onmouseover = () => {
		bickySavoir.style.visibility = "visible";
		bickySavoir.style.opacity = "1";
	}

	document.getElementById("button-question").onmouseout = () => {
		bickySavoir.style.opacity = "0";
		bickySavoir.style.visibility = "hidden";
	}

	document.getElementById("starter_pack_container").setAttribute("class", "container_map")

});
