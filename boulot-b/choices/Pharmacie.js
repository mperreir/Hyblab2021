const Choice = require("./Choice");

class Pharmacie extends Choice {
    constructor() {
        super();
        this.theme = "pharmacie"
        this.description =  "Tiens, au cas où tu en aurais besoin, une pharmacie se situe entre ton lieu de travail et ton domicile."
        this.name = "Pharmacie"
    }
}

module.exports = Pharmacie