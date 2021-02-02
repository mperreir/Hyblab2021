const Choice = require("./Choice");

class Boulangerie extends Choice {
    theme = "bakery"
    description =  "Hmm on dirait qu’une boulangerie se trouve sur ton trajet retour. Plutôt baguette, viennoiserie ou pâtisserie ?"
    name = "Boulangerie"
}

module.exports = Boulangerie