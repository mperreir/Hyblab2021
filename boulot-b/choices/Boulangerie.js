const Choice = require("./Choice");

class Boulangerie extends Choice {
    constructor() {
        super();
        this.theme = "bakery"
        this.description =  "Hmm on dirait qu’une boulangerie se trouve sur ton trajet retour. Plutôt baguette, viennoiserie ou pâtisserie ?"
        this.name = "Boulangerie"
    }
}

module.exports = Boulangerie