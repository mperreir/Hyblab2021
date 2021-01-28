const fs = require('fs');
const data = JSON.parse(fs.readFileSync('parents-a/public/data/formatedData.json'));

module.exports = {

    getAllParc: () => {
        return data.filter(p => p.Type === 'Parc');
    },

    // getParcWithAnimals: () => {
    //     return data.filter(p => p.Animmaux !== null);
    // },

    // getParcWithInsaneTrees() {
    //     return data.filter(p => p['Nb arbre formidable'] > 0);
    // },

    // getParcPourEnfantAventurier() {
    //     return data.filter(p => p['Animaux'] !== null || p['Nb arbre'] > 100 || p['Nb plantes'] !== null);
    // },

    // getParcGrandPeriple() {
    //     return this.getParcPourEnfantAventurier().filter(p => p['Nb arbre formidable'] > 0 || p['Jeux pour enfants'] === 'OUI');
    // },

    // getParcCalme() {
    //     let moyenne = 0;
    //     data.forEach(p => {
    //         moyenne += p['Nb arbre'];
    //     });
    //     moyenne /= data.length;
    //     return this.getParcGrandPeriple().filter(p => p['Nb arbre'] > moyenne);
    // }

    getParcAventurier() {
        return data.filter(p => p['Nb arbre'] > 30 || p['Nb plantes'] !== null || p['Animaux'] !== null || p['Elements atypiques'] !== null)
    },

    getParcNonAventurier() {
        return data.filter(p => p['Nb plantes'] !== null || p['Indice de Shanon arbres'] > 1 || p['Elements atypiques'] !== null)
    },

    getParcPleinLaVue(data) {
        return data.filter(p => p['Nb arbre formidable'] > 20 || p['Indice de Shanon arbres'] > 2 || p['Nb plantes'] !== null || p['Elements atypiques'] !== null)
    },

    getParcNonPleinLaVue(data) {
        return data.filter(p => p['Nb arbre formidable'] > 20 || p['Indice de Shanon arbres'] > 2 || p['Nb plantes'] !== null)
    },

    getParcBeauDecor(data) {
        return data.filter(p => p['Nb arbre formidable'] > 20 || p['Indice de Shanon arbres'] > 2 || p['Nb plantes'] !== null ||p['Elements atypiques'].split(',').find(m => m === 'Art' || p['Elements atypiques'].split(',').find(m => m === 'Architecture') ))
    }, 

    getParcBeauPaysage(data) {
        return data.filter(p => p['Nb arbre formidable'] > 20 || p['Indice de Shanon arbres'] > 2 || p['Nb plantes'] !== null ||p['Elements atypiques'].split(',').find(m => m === 'Charme naturel') )
    },

    getParcAvecAnimaux(data) {
        return data.filter(p => p['Animaux'] !== null)
    },

    getEcouterDesAnimaux(data) {
        return data.filter(p => p['Animaux'] !== null)
    }
}