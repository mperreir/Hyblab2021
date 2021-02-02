const {getStreetViewUrl, extractUtilsValue, getShortestExcursion,
    pointInteret} = require("../helpers");

class Choice {
    async addPOI(origin, arrivee, transport, list_POI) {
        let list = await pointInteret(origin, arrivee, this.theme, transport)
        if (list) {
            let indexResult2 = getShortestExcursion(list);
            let data = list[indexResult2]
            let POI = extractUtilsValue(data)
            POI["description"] = this.description
            POI["streetView"] = getStreetViewUrl(POI.coordonnees.lat, POI.coordonnees.lng);
            list_POI.push({
                [this.name]: POI,
                "distance": data.distance
            })
        }
    }
}

module.exports = Choice