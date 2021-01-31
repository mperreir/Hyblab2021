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

	if (pluie)
		textInstructions += "- Un vêtement de pluie. \n";

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
		textMeteo += `- Météo de la prochaine heure : \n`;
		weather.forEach(e => {
			textMeteo += `- ${e.description}\n`;
		});
	}

	document.getElementById("meteo").innerText = textMeteo;

	////////////// Trafic //////////////

	let textTraffic = "";
	if (fluiditeTrajet === "Fluide")
		textTraffic += "- La route est dégagée, à fond les pédales !\n"
	else
		textTraffic += "- Bouchons sur ton trajet, gardes-en sous la pédale !\n"

	textTraffic += `- Distance du trajet : ${(distanceTrajet / 1000).toFixed(2)}km \n` +
		`- Durée du trajet : ${Math.round(dureeTrajet / 60)} minutes \n` +
		`- En partant maintenant vous arriverez à ${heureArrive.toLocaleTimeString("fr-FR")}`;

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
		messageFin = "C’est un temps idéal pour faire du vélo !"
	} else if (pluie) { // Si pluie
		messageFin = "Même s’il fait gris, prends ton vélo pour garder la pêche !"
	} else if (temperature <= 3 || alerts.length > 0) { // Si verglas
		messageFin = "Fais bien attention et ne prend pas de risque inconsidéré !"
	} else if (temperature <= 13) { // Si froid
		messageFin = "Un peu de vélo pour rester chaud !"
	} else {
		messageFin = "Sur ce, bonne route !"
	}

	document.getElementById("messageFin").innerText = messageFin;

	let bickySavoir = document.getElementsByClassName("bicky-savoir");

	document.getElementById("button-question").onmouseover = () => {
		bickySavoir.item(0).style.visibility = "visible";
		bickySavoir.item(1).style.visibility = "visible";
	}

	document.getElementById("button-question").onmouseout = () => {
		bickySavoir.item(0).style.visibility = "hidden";
		bickySavoir.item(1).style.visibility = "hidden";
	}

});
