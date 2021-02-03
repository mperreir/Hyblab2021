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
            this.specialDescription(POI);
            list_POI.push({
                [this.name]: POI,
                "distance": data.distance
            })
        }
    }

     specialDescription(POI){
        if(POI.titre === "Château des Ducs de Bretagne"){
            POI["description"] = "Quelle chance ! Ton trajet passe tout près du Château des Ducs de Bretagne. Classé monument historique depuis 1840, il a été construit en majeure partie au XVème siècle. N’hésite pas à prendre un moment pour admirer le bâtiment historique ainsi que son jardin verdoyant."
        }
        if(POI.titre === "Statue de la Duchesse Anne de Bretagne"){
            POI["description"] = "Tu souhaites faire le plein de culture en rentrant chez toi ? bonne idée ! Place Marc-Elder, tu passeras devant la célèbre statue d’Anne de Bretagne, reine de France au XVème siècle. Sais-tu qu’il en existe une deuxième à Nantes ?"
        }
        if(POI.titre === "Île de Versailles, Nantes, Pays de la Loire, France"){
            POI["description"] = "L'Île de Versaille se trouve sur ton chemin ! Tout près de la Maison de l'Erdre, cette île articifielle a été construite en 1831 et mesure 1,7 hectares ! Tu pourras t’y promener dans une ambiance zen tout en profitant d’un décor japonisant."
        }
    }

}

module.exports = Choice