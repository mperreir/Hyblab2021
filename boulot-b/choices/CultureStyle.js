const Choice = require("./Choice");

class CultureStyle extends Choice {
    constructor() {
        super();
        this.theme = "tourist-attraction"
        this.description =  "Petite halte culturelle, ce lieu historique se trouve sur ton trajet. Il s'agit d'un élément incournable du patrimoine culturel nantais !"
        this.name = "Culture"
    }
}

module.exports = CultureStyle