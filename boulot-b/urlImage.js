'use-strict';

const fetch = require('node-fetch');

async function getUrlImage(req, res) {
    const imageName = req.params.imageName;

    const reponseJSON = {
        urlImage: 'http://[' + process.env.HOST + ']:' + process.env.PORT + '/boulot-b/images/' + imageName,
    }

    res.status(200).json(reponseJSON);
}

module.exports = getUrlImage;
