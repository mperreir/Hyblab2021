let json = require('../data/jardins');
console.log(json);

/*
json.forEach(x => x.nbElemCorrect = 0);

let nbCritereTraite = 0;

json.forEach(x => {
    if (x["Chiens autorisés"]) x.nbElemCorrect++;
});

nbCritereTraite++;

json.sort((a, b) => { return b.nbElemCorrect - a.nbElemCorrect });

console.log(json);
json.filter(x => x["Nom"]);
json.filter(x => x["Type"]);
json.filter(x => x["Adresses"]);

json.filter(x => x["Géolocalisation"]);
json.filter(x => x["Code postal"]);
json.filter(x => x["Web"]);

// Information complémentaire

json.filter(x => x["Informations complémentaires"]);

json.forEach(x => {
	if (x["Informations complémentaires"]) x.nbElemCorrect++;
});

// Gardien

json.filter(x => x["Gardien"]);

json.forEach(x => {
	if (x["Gardien"]) x.nbElemCorrect++;
});

// Jeux pour enfants

json.filter(x => x["Jeux pour enfants"]);

json.forEach(x => {
	if (x["Jeux pour enfants"]) x.nbElemCorrect++;
});

// Pataugeoire

json.filter(x => x["Pataugeoire"]);

json.forEach(x => {
	if (x["Pataugeoire"]) x.nbElemCorrect++;
});

// Sanitaires

json.filter(x => x["Sanitaires"]);

json.forEach(x => {
	if (x["Sanitaires"]) x.nbElemCorrect++;
});

// Sanitaires pour handicapés

json.filter(x => x["Sanitaires pour handicapés"]);

json.forEach(x => {
	if (x["Sanitaires pour handicapés"]) x.nbElemCorrect++;
});

// Jardin clos

json.filter(x => x["Jardin clos"]);

json.forEach(x => {
	if (x["Jardin clos"]) x.nbElemCorrect++;
});

// Abris

json.filter(x => x["Abris"]);

json.forEach(x => {
	if (x["Abris"]) x.nbElemCorrect++;
});

// Point d'eau

json.filter(x => x["Point d'eau"]);

json.forEach(x => {
	if (x["Point d'eau"]) x.nbElemCorrect++;
});

// Table de pique-nique

json.filter(x => x["Table pique-nique"]);

json.forEach(x => {
	if (x["Table pique-nique"]) x.nbElemCorrect++;
});

// Accès transports en commun

json.filter(x => x["Accès transports en commun"]);

json.forEach(x => {
	if (x["Accès transports en commun"]) x.nbElemCorrect++;
});

// Bancs

json.filter(x => x["Bancs"]);

json.forEach(x => {
	if (x["Bancs"]) x.nbElemCorrect++;
});

// Accès Parking

json.filter(x => x["Accès Parking"]);

json.forEach(x => {
	if (x["Accès Parking"]) x.nbElemCorrect++;
});

// Restauration

json.filter(x => x["Restauration"]);

json.forEach(x => {
	if (x["Restauration"]) x.nbElemCorrect++;
});

// Présence d'animaux

json.filter(x => x["Présence d'animaux"]);

json.forEach(x => {
	if (x["Présence d'animaux"]) x.nbElemCorrect++;
});

// Herbe/sable

json.filter(x => x["Herbe (un minimum) / Sable"]);

json.forEach(x => {
	if (x["Herbe (un minimum) / Sable"]) x.nbElemCorrect++;
});

// Verdure / Espace vert

json.filter(x => x["Verdure / Plante Espace Vert"]);

json.forEach(x => {
	if (x["Verdure / Plante Espace Vert"]) x.nbElemCorrect++;
});

// CRAPA

json.filter(x => x["CRAPA"]);

json.forEach(x => {
	if (x["CRAPA"]) x.nbElemCorrect++;
});

// Terrains de sport

json.filter(x => x["Terrains de sport"]);

json.forEach(x => {
	if (x["Terrains de sport"]) x.nbElemCorrect++;
});

// Activités organisées

json.filter(x => x["Activités organisées"]);

json.forEach(x => {
	if (x["Activités organisées"]) x.nbElemCorrect++;
});

// Element de culture

json.filter(x => x["Élément de culture"]);

json.forEach(x => {
	if (x["Élément de culture"]) x.nbElemCorrect++;
});

// Horaires d'ouverture

// TODO Définir la détection des horraires
json.filter(x => x["Horaires d'ouverture"]);

// Age

// TODO Avoir une gestion de l'âge par rapport à l'écart à la tranche d'âge
json.filter(x => x["Âge"]);

// Taille

// TODO Définir Qu'est ce qu'un grand/moyen/petit parc
json.filter(x => x["Taille (m^2)"]);
*/