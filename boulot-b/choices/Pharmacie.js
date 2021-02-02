const Choice = require("./Choice");

class Pharmacie extends Choice {
    theme = "pharmacie"
    description =  "Tiens, au cas où tu en aurais besoin, une pharmacie se situe entre ton lieu de travail et ton domicile."
    name = "Pharmacie"
}

module.exports = Pharmacie