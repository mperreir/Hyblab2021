const Choice = require("./Choice");

class Lieux extends Choice {
    constructor(listLieux) {
        super();
        this.listLieux = listLieux
    }

    async addPOI(origin, arrivee, transport, list_POI) {
        for (const lieux of this.listLieux) {
            await lieux.addPOI(origin, arrivee, transport, list_POI);
        }
    }
}

module.exports = Lieux
