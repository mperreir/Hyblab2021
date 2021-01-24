const fs = require('fs');
const data  = JSON.parse(fs.readFileSync('parents-a/public/data/formatedData.json'));

module.exports = {

    getAllParc: () =>{
        return data.filter(p => p.Type === 'Parc' );
    },

    getParcWithAnimals: ()=> {
        return data.filter(p => p.Animmaux !== null);
    },




}
