'use strict';

const CultureStyle = require("./choices/CultureStyle");
const NatureStyle = require("./choices/NatureStyle");
const Boulangerie = require("./choices/Boulangerie");
const SalleDeSport = require("./choices/SalleDeSport");
const Bar = require("./choices/Bar");
const Pharmacie = require("./choices/Pharmacie");
const AleaStyle = require("./choices/AleaStyle");

function StyleFactory(style){
    if (style === "nature")
        return new NatureStyle()
    if (style === "culture")
        return new CultureStyle()
    if (style === "alea")
        return new AleaStyle()
}

async function choixLieux(boulangerie, origin, arrivee, transport, list_POI, sallesport, bar, pharmacie) {
    if (boulangerie === 'true') {
        const boulang = new Boulangerie()
        await boulang.addPOI(origin, arrivee, transport, list_POI);
    }
    if (sallesport === 'true') {
        const salle = new SalleDeSport()
        await salle.addPOI(origin, arrivee, transport, list_POI);
    }
    if (bar === 'true') {
        const ba = new Bar()
        await ba.addPOI(origin, arrivee, transport, list_POI);
    }
    if (pharmacie === 'true') {
        const pharma = new Pharmacie()
        await pharma.addPOI(origin, arrivee, transport, list_POI);
    }
}

async function choixStyle(style, origin, arrivee, transport, list_POI) {
    /** definition du style : nature/culture/aleatoire */
    const newStyle = StyleFactory(style)
    await newStyle.addPOI(origin, arrivee, transport, list_POI)
}

async function getAll(req,res){
    const {transport, style, sallesport, bar, boulangerie, pharmacie,
            departX, departY, arriveeX, arriveeY} = req.params
    const origin = [-1,-1]
    const arrivee = [-1,-1]

    origin[0] = Number(departX)
    origin[1] = Number(departY)
    arrivee[0] = Number(arriveeX)
    arrivee[1] = Number(arriveeY)

    let list_POI = [];
    try {
        await choixStyle(style, origin, arrivee, transport, list_POI);
        await choixLieux(boulangerie, origin, arrivee, transport, list_POI, sallesport, bar, pharmacie);

        list_POI = list_POI.sort(function(a, b){
            return a.distance-b.distance;
        })
        /** la reponse retourner */
        const reponseJSON = {
            Depart : origin,
            Arrivee : arrivee,
            POI : list_POI
        };
        res.status(200).json(reponseJSON);
    } catch (e) {
        res.status(404).json(e.message)
    }
}

module.exports = getAll;

