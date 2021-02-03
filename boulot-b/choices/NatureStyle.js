const Choice = require("./Choice");

class NatureStyle extends Choice {
    constructor() {
        super();
        this.name = "Nature"
        this.theme = "natural-geographical"
        this.description = "Tu passes juste à côté de ce petit coin vert, voici l'occasion parfaite pour admirer la végétation et respirer le grand air !";
    }
}

module.exports = NatureStyle