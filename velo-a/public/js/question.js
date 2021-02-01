"use strict";

import { slide } from "./modules/background.js";

let lastPage = "";

window.addEventListener('DOMContentLoaded', () => {

	slide(() => {}, () => load(lastPage), null);

	load("");
});


function load(page) {
	let background = document.getElementById("background-resultat");
	let container = document.getElementById("container-resultat");

	background.style.background = "rgba(0, 0, 0, 0)";
	background.style.zIndex = "-2";

	container.style.bottom = "-200%";

	let listP = [];
	let p;
	let buttons;

	switch (page) {
		default:
		case "météo" :
			document.getElementById("h2-question").innerText = "Quelle est la température annuelle à Nantes ?";

			buttons = document.getElementsByClassName("button-slide");
			for (let i = 0; i < buttons.length; i++) {
				buttons.item(i).style.minWidth = "24%";
			}

			buttons.item(0).innerText = "8.4°C";
			buttons.item(1).innerText = "11.6°C";
			buttons.item(2).innerText = "15°C";
			buttons.item(3).innerText = "19.3°C";

			buttons.item(0).addEventListener("click", () => { bicky(false, "Oh non !"); });
			buttons.item(1).addEventListener("click", () => { bicky(true, "Bien joué l'artiste !"); });
			buttons.item(2).addEventListener("click", () => { bicky(false, "Oh non !"); });
			buttons.item(3).addEventListener("click", () => { bicky(false, "Oh non !"); });

			document.getElementById("div-info-question").innerHTML = "";

			p = document.createElement("p");
			p.appendChild(document.createTextNode("En moyenne, la température annuelle de la ville est de "));
			p.appendChild(bold("11.6°C."));
			p.appendChild(br());
			p.appendChild(document.createTextNode("Le climat à Nantes est dit tempéré chaud et est de type Cfb, " +
				"c’est-à-dire qu’il est tempéré chaud sans saison sèche et à été tempéré, selon la classification " +
				"Köppen-Geiger qui est la classification des climats fondée sur les précipitations et températures."));
			listP.push(p);

			p = document.createElement("p");
			p.appendChild(document.createTextNode("Mais attention ! A " +
				"Nantes, la pluie est assez fréquente puisque de fortes averses s’abattent tout l’année sur Nantes, " +
				"même lors des mois les plus secs où les précipitations restent importantes. En tout, les " +
				"précipitations annuelles moyennes sont de 786 mm."));
			listP.push(p);

			p = document.createElement("p");
			p.appendChild(document.createTextNode("D’ailleurs le savais-tu ?"));
			p.appendChild(br());
			p.appendChild(bold("Le vêtement de pluie est un incontournable du cycliste quotidien nantais !"));
			listP.push(p);

			p = document.createElement("p");
			p.appendChild(bold("Source : "));
			p.appendChild(link("https://climate-data.org", "climate-data.org"));
			listP.push(p);

			addTextIntoDiv(listP);

			document.getElementById("button-next-question").addEventListener("click", () => {
				lastPage = page;
				load("pollution");
			}, { once: true });

			break;

		case "pollution" :
			document.getElementById("h2-question").innerText = "Combien de CO2 par gramme permet de sauver un kilomètre parcouru en vélo ?";

			buttons = document.getElementsByClassName("button-slide");
			for (let i = 0; i < buttons.length; i++) {
				buttons.item(i).style.minWidth = "24%";
			}

			buttons.item(0).innerText = "5 grammes";
			buttons.item(1).innerText = "12 grammes";
			buttons.item(2).innerText = "22 grammes";
			buttons.item(3).innerText = "30 grammes";

			buttons.item(0).addEventListener("click", () => { bicky(false, "Pas de bol !"); });
			buttons.item(1).addEventListener("click", () => { bicky(false, "Pas de bol !"); });
			buttons.item(2).addEventListener("click", () => { bicky(false, "Pas de bol !"); });
			buttons.item(3).addEventListener("click", () => { bicky(true, "Tip top toi !"); });

			document.getElementById("div-info-question").innerHTML = "";

			p = document.createElement("p");
			p.appendChild(document.createTextNode("En termes de transport, le vélo est LA solution idéale pour tenter " +
				"de réduire sa consommation de CO2 relâché dans l’atmosphère. En plus d’être peu onéreux et un " +
				"excellent moyen de pratiquer une activité physique quotidienne, le vélo permet en effet d’économiser "));
			p.appendChild(bold("30 grammes de CO2 par kilomètre "));
			p.appendChild(document.createTextNode("parcouru."));
			listP.push(p);

			p = document.createElement("p");
			p.appendChild(document.createTextNode("Allez, sors ton maillot de cycliste pour le bien de la planète !"));
			listP.push(p);

			p = document.createElement("p");
			p.appendChild(bold("Source : "));
			p.appendChild(link("https://citycle.com", "citycle.com"));
			listP.push(p);

			addTextIntoDiv(listP);

			document.getElementById("button-next-question").addEventListener("click", () => {
				lastPage = page;
				load("activité");
			}, { once: true });

			break;

		case "activité" :
			document.getElementById("h2-question").innerText = "1h de vélo à 15 km/h permet d’éliminer :";

			buttons = document.getElementsByClassName("button-slide");
			for (let i = 0; i < buttons.length; i++) {
				buttons.item(i).style.minWidth = "40%";
			}

			buttons.item(0).innerText = "Un burger ou une pizza\n(~500 calories)";
			buttons.item(1).innerText = "Une canette de soda\n(~140 calories)";
			buttons.item(2).innerText = "Un sachet de bonbons de 100g\n(~360 calories)";
			buttons.item(3).innerText = "Une bière bien fraîche 6%\n(~ 50 calories)";

			buttons.item(0).addEventListener("click", () => { bicky(true, "Bravo !"); });
			buttons.item(1).addEventListener("click", () => { bicky(false, "La prochaine sera la bonne !"); });
			buttons.item(2).addEventListener("click", () => { bicky(false, "La prochaine sera la bonne !"); });
			buttons.item(3).addEventListener("click", () => { bicky(false, "La prochaine sera la bonne !"); });

			document.getElementById("div-info-question").innerHTML = "";

			p = document.createElement("p");
			p.appendChild(document.createTextNode("En plus d’éliminer "));
			p.appendChild(bold("500 calories en 1h"));
			p.appendChild(document.createTextNode(", faire du vélo améliore l’endurance, mais aussi l’équilibre. " +
				"Il permet de se muscler, notamment au niveau des mollets, cuisses et fessiers. De plus, il n’a pas de " +
				"contre-indication, autrement dit tout le monde peut l’utiliser même pour de la rééducation. Alors, " +
				"plus aucune excuse !"));
			listP.push(p);

			p = document.createElement("p");
			p.appendChild(link("https://www.mangerbouger.fr/Le-Mag/Vie-Pratique/Velo-on-a-tous-une-bonne-raison-de-pedaler-!",
				"https://www.mangerbouger.fr/Le-Mag/Vie-Pratique/Velo-on-a-tous-une-bonne-raison-de-pedaler-!"));
			listP.push(p);

			addTextIntoDiv(listP);

			document.getElementById("button-next-question").addEventListener("click", () => {
				lastPage = page;
				load("VAE");
			}, { once: true });

			break;

		case "VAE" :
			document.getElementById("h2-question").innerText = "Quel est le montant maximal du bonus à l’achat " +
				"d’un VAE (Vélo à assistance électrique) versé par l’Etat en 2020 ?";

			buttons = document.getElementsByClassName("button-slide");
			for (let i = 0; i < buttons.length; i++) {
				buttons.item(i).style.minWidth = "24%";
			}

			buttons.item(0).innerText = "50 euros";
			buttons.item(1).innerText = "100 euros";
			buttons.item(2).innerText = "150 euros ";
			buttons.item(3).innerText = "200 euros ";

			buttons.item(0).addEventListener("click", () => { bicky(false, "À quelques euros près..."); });
			buttons.item(1).addEventListener("click", () => { bicky(false, "À quelques euros près..."); });
			buttons.item(2).addEventListener("click", () => { bicky(false, "À quelques euros près..."); });
			buttons.item(3).addEventListener("click", () => { bicky(true, "Yes, t'es un bon toi !"); });

			document.getElementById("div-info-question").innerHTML = "";

			p = document.createElement("p");
			p.appendChild(document.createTextNode("Sous conditions, il est possible, depuis le 1er février 2018, " +
				"d’obtenir une aide versée par l’Etat français à l’achat d’un vélo à assistance électrique. Cette aide, "));
			p.appendChild(bold("d’un montant maximum de 200€ "));
			p.appendChild(document.createTextNode("est versée si le demandeur s’est vu attribuer une aide par une " +
				"collectivité locale au même titre."));
			listP.push(p);

			p = document.createElement("p");
			p.appendChild(document.createTextNode("Une initiative qui donne un vrai coup de guidon à l’utilisation du " +
				"vélo dans la vie de tous les jours, comme une solide alternative à la voiture !"));
			listP.push(p);

			p = document.createElement("p");
			p.appendChild(document.createTextNode("Vous pouvez vérifier votre éligibilité sur le site :"));
			p.appendChild(br());
			p.appendChild(link("https://www.asp-public.fr/bonus-velo-assistance-electrique", "https://www.asp-public.fr/bonus-velo-assistance-electrique"));
			p.appendChild(br());
			p.appendChild(bold("Source : "));
			p.appendChild(link("https://www.asp-public.fr/", "asp-public.fr"));
			listP.push(p);

			addTextIntoDiv(listP);

			let buttonSuivant = document.getElementById("button-next-question");
			buttonSuivant.innerText = "C'est la fin, good job !";

			buttonSuivant.addEventListener("click", () => {
				document.location.href = "starterPack.html";
			}, { once: true });

			break;

	}

	function link(link, text) {
		const a = document.createElement("a");
		a.href = link;
		a.appendChild(document.createTextNode(text));
		return a;
	}

	function br() {
		return document.createElement('br');
	}

	function bold(msg) {
		const bold = document.createElement('strong');
		bold.appendChild(document.createTextNode(msg));
		return bold
	}

	function addTextIntoDiv(list) {
		list.forEach(elem => {
			elem.classList.add("text-question");
			document.getElementById("div-info-question").appendChild(elem);
		});
	}

	function bicky(response, msg) {
		let background = document.getElementById("background-resultat");
		let container = document.getElementById("container-resultat");

		background.style.zIndex = "4";
		background.style.background = "rgba(0, 0, 0, 0.2)";

		container.style.bottom = "0";

		document.getElementById("background-resultat").addEventListener("click", () => {
			background.style.background = "rgba(0, 0, 0, 0)";
			background.style.zIndex = "-2";

			container.style.bottom = "-200%";
		});

		if (response) {
			document.getElementById("img-bicky").src = "img/mascottes/bicky_bon.svg";
		} else {
			document.getElementById("img-bicky").src = "img/mascottes/bicky_faux.svg";
		}

		document.getElementById("bicky-reponse").innerText = msg;
	}

}
