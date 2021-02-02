'use strict';

const {lieuxFactory, styleFactory} = require("./factories");

async function getAll(req, res) {
    const {transport, style, sallesport, bar, boulangerie, pharmacie,
            departX, departY, arriveeX, arriveeY} = req.params
    const origin = [ Number(departX), Number(departY) ]
    const arrivee = [ Number(arriveeX), Number(arriveeY) ]
    let list_POI = [];
    /** definition du style : nature/culture/aleatoire */
    const styleChoose = styleFactory(style)
    await styleChoose.addPOI(origin, arrivee, transport, list_POI);
    const lieuxChoose = lieuxFactory(boulangerie, sallesport, bar, pharmacie)
    await lieuxChoose.addPOI(origin, arrivee, transport, list_POI);

    list_POI = list_POI.sort(function(a, b){
        return a.distance-b.distance;
    })
    res.status(200).json({
        Depart: origin,
        Arrivee: arrivee,
        POI: list_POI
    });
}

module.exports = getAll;

