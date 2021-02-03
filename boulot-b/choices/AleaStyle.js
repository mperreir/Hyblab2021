const Choice = require("./Choice");
const {extractUtilsValue, getRandomInt, pointInteret,
    getRandomIntInclusive} = require("../helpers");

class AleaStyle extends Choice {
    constructor() {
        super();
        this.name = "Hasard"
        this.theme = ["nature", "culture"]
    }

    async addPOI(origin, arrivee, transport, list_POI) {
        const randomHasard = getRandomIntInclusive(0, 1);
        let listHasard = await pointInteret(origin, arrivee, this.theme[randomHasard], transport)
        if (listHasard) {
            let randH = getRandomInt(0, listHasard.length)
            let P_hasard1 = listHasard[randH]
            let P_hasard = extractUtilsValue(P_hasard1)
            list_POI.push({
                [this.name]: P_hasard,
                "distance": P_hasard1.distance
            })
        }
    }

}

module.exports = AleaStyle