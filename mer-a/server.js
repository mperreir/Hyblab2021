// Use strict mode
'use strict';

// Load usefull expressjs and nodejs objects / modules
var express = require('express');
var path = require('path');

const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

// Load server CONFIG variables
const config = require('./server/config.js');
console.log(config);

// Load useful classes
var Legende = require('./server/classes/Legende.js');

// Create the application object
var app = express();


// open database
let db = null;
(async () => {
  db = await open({filename: config.ROOT + config.DB_PATH, driver: sqlite3.Database});
})();


app.get(`${config.API_URL}all/regions`, async (req, res) => {
  let sql = 'SELECT * FROM DEPARTEMENT;'
  const rows = await db.all(sql, []);
  rows.forEach((row) => {
    row.nomDepartement = decodeURI(row.nomDepartement);
  });
  console.log(rows);
  res.status(200).json(rows);
});

app.get(`${config.API_URL}all/types`, async (req, res) => {
  let sql = 'SELECT * FROM CATEGORIE;'
  const rows = await db.all(sql, []);
  rows.forEach((row) => {
    row.nomCategorie = decodeURI(row.nomCategorie);
    row.nomPersonnage = decodeURI(row.nomPersonnage);
    row.phraseCat = decodeURI(row.phraseCat);
    row.imageURI = decodeURI(row.imageURI);
  });
  console.log(rows);
  res.status(200).json(rows);
});


// Route to get get one legend by id
app.get(`${config.API_URL}legende/:id`, async (req, res) => {
    var sql = `SELECT Legende.id as idLegende, Departement.id as idDepartement, Categorie.id as idCategorie, Legende.nom as nom, departementId, categorieId,
    resume, histoire, latitude, longitude, adresse, baignade, toilettes, restaurant,
    photo, nomDepartement, nomCategorie, imageURI
    FROM Legende INNER JOIN Departement ON Departement.id = departementId
    INNER JOIN Categorie ON Categorie.id = categorieId WHERE Legende.id = ?; `;

    const row = await db.get(sql, [req.params.id]);
    row.nom = decodeURI(row.nom);
    row.resume = decodeURI(row.resume);
    row.histoire = decodeURI(row.histoire);
    row.adresse = decodeURI(row.adresse);
    row.photo = decodeURI(row.photo);
    row.nomDepartement = decodeURI(row.nomDepartement);
    row.nomCategorie = decodeURI(row.nomCategorie);
    row.imageURI = decodeURI(row.imageURI);
    console.log(row);
    res.status(200).json(row);
});

// Add route to get the legends
app.get(`${config.API_URL}:region/:typeHistoire`, async (req, res) => {
    // Declaration of the variables
    var legendes = [];
    var sql = `SELECT Legende.id as id, Legende.nom as nom, departementId, categorieId,
    resume, histoire, latitude, longitude, adresse, baignade, toilettes, restaurant,
    photo, nomDepartement, nomCategorie, imageURI
    FROM Legende INNER JOIN Departement ON Departement.id = departementId
                INNER JOIN Categorie ON Categorie.id = categorieId WHERE departementId = ?
                AND categorieId = ?;`;
    console.log(sql + `\ndep: "${req.params.region}",\ncat: "${req.params.typeHistoire}"`);

    // Get the query result
    const rows = await db.all(sql, [req.params.region, req.params.typeHistoire]);
    // Process the query result
    rows.forEach((row) => {
      console.log(row);
        var legende = new Legende(
            row.id,
            decodeURI(row.nom), 
            decodeURI(row.nomDepartement), //A modifier
            decodeURI(row.nomCategorie),   //A modifier
            decodeURI(row.resume), 
            decodeURI(row.histoire), 
            row.latitude, 
            row.longitude, 
            decodeURI(row.adresse),
            (row.baignade === 1 ? true : false), 
            (row.toilettes === 1 ? true : false), 
            (row.restaurant === 1 ? true : false), 
            decodeURI(row.photo));
        legendes.push(legende);
    });
    // Show and send processed query result
    console.log(legendes);
    res.status(200);
    res.json({data:legendes});
});


// Route to reach the departements page
app.get(`/departements`, async (req, res) => {
    res.status(200).sendFile(`public/html/departements.html`, { root : config.ROOT });
});

// Route to reach the personnages page

app.get(`/personnages/:idDep`, async (req, res) => {
    res.status(200).sendFile(`public/html/personnages.html`, { root : config.ROOT });
});

// Route to reach the departement page
app.get(`/departement/:idDep/:idPerso`, async (req, res) => {
    res.status(200).sendFile(`public/html/departement.html`, { root : config.ROOT });
});

// Route to reach the legende page
app.get(`/legende/:idDep`, async (req, res) => {
    res.status(200).sendFile(`public/html/legende.html`, { root : config.ROOT });
    /*await fs.readFile(`${config.ROOT}public/html/legende.html`, (err, data) => {
      if(err) {
        console.error(err);
        res.status(500).send('Invalid file path.');
      }
      else res.status(200).send(data.toString());
    });*/
});

// close the database connection
/*db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});*/

// Minimum routing: serve static content from the html directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../__common-logos__')));

// You can then add whatever routing code you need

// This module is exported and served by the main server.js located
// at the root of this set of projects. You can access it by lanching the main
// server and visiting http(s)://127.0.0.1:8080/name_of_you_project/ (if on a local server)
// or more generally: http(s)://server_name:port/name_of_you_project/

// Pour lancer depuis mer-a (npm start)
//app.listen(8080);

//Pour lancer depuis Hyblab2021 / racine (npm start)
module.exports = app;
