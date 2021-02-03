const Boulangerie = require("./choices/Boulangerie");
const SalleDeSport = require("./choices/SalleDeSport");
const Bar = require("./choices/Bar");
const Pharmacie = require("./choices/Pharmacie");
const NatureStyle = require("./choices/NatureStyle");
const CultureStyle = require("./choices/CultureStyle");
const Lieux = require("./choices/Lieux");

function styleFactory(style){
    if (style === "nature")
        return new NatureStyle()
    if (style === "culture")
        return new CultureStyle()
    if (style === "alea"){
        let random = Math.floor(Math.random() * 2);
        return (random ? new NatureStyle() : new CultureStyle());
    }
}

function lieuxFactory(boulangerie, sallesport, bar, pharmacie) {
    const listLieux = [];
    if (boulangerie === 'true')
        listLieux.push(new Boulangerie());
    if (sallesport === 'true')
        listLieux.push(new SalleDeSport());
    if (bar === 'true')
        listLieux.push(new Bar());
    if (pharmacie === 'true')
        listLieux.push(new Pharmacie());
    return new Lieux(listLieux);
}

module.exports = {
    lieuxFactory,
    styleFactory
}
