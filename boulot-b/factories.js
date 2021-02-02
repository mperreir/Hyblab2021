const Boulangerie = require("./choices/Boulangerie");
const SalleDeSport = require("./choices/SalleDeSport");
const Bar = require("./choices/Bar");
const Pharmacie = require("./choices/Pharmacie");
const NatureStyle = require("./choices/NatureStyle");
const CultureStyle = require("./choices/CultureStyle");
const AleaStyle = require("./choices/AleaStyle");

function styleFactory(style){
    if (style === "nature")
        return new NatureStyle()
    if (style === "culture")
        return new CultureStyle()
    if (style === "alea")
        return new AleaStyle()
}

function lieuxFactory(boulangerie, sallesport, bar, pharmacie) {
    const lieux = []
    if (boulangerie === 'true')
        lieux.push(new Boulangerie())
    if (sallesport === 'true')
        lieux.push(new SalleDeSport())
    if (bar === 'true')
        lieux.push(new Bar())
    if (pharmacie === 'true')
        lieux.push(new Pharmacie())
    return lieux
}

module.exports = {
    lieuxFactory,
    styleFactory
}
