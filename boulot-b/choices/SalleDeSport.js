const Choice = require("./Choice");

class SalleDeSport extends Choice {
    constructor() {
        super();
        this.theme = "fitness-health-club"
        this.description = "Nous avons trouvé cette salle de sport sur ton chemin ! Une belle occasion de te défouler après ta journée."
        this.name = "SalleSport"
    }
}

module.exports = SalleDeSport
