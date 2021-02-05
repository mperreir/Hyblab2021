const Choice = require("./Choice");

class Bar extends Choice {
    constructor() {
        super();
        this.theme = "bar"
        this.description =  "Ce bar se trouve sur ton chemin. De quoi profiter seul ou à plusieurs, d’un moment de détente en fin de journée."
        this.name = "Bar"
    }
}

module.exports = Bar