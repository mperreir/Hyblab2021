const fs = require('fs');
const data = JSON.parse(fs.readFileSync('parents-a/public/data/formatedData.json'));

module.exports = {

    getAllParc: () => {
        return data.filter(p => p.Type === 'Parc');
    },

    getParcWithAnimals: () => {
        return data.filter(p => p.Animmaux !== null);
    },

    getParcWithInsaneTrees() {
        return data.filter(p => p['Nb arbre formidable'] > 0);
    },

    getParcPourEnfantAventurier() {
        return data.filter(p => p['Animaux'] !== null || p['Nb arbre'] > 100 || p['Nb plantes'] !== null);
    },

    getParcGrandPeriple() {
        return this.getParcPourEnfantAventurier().filter(p => p['Nb arbre formidable'] > 0 || p['Jeux pour enfants'] === 'OUI');
    },

    getParcCalme() {
        let moyenne = 0;
        data.forEach(p => {
            moyenne += p['Nb arbre'];
        });
        moyenne /= data.length;
        return this.getParcGrandPeriple().filter(p => p['Nb arbre'] > moyenne);
    }

}