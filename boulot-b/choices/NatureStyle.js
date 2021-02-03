const Choice = require("./Choice");

class NatureStyle extends Choice {
    constructor() {
        super();
        this.name = "Nature"
        this.theme = "natural-geographical"
        this.description = "Tu passes juste à côté de ce parc, voici l'occasion parfaite pour admirer la végétation et respirer le grand air, le temps de traverser ses allées !";
    }
}

module.exports = NatureStyle
