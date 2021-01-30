//Mon objet stockant mes données 
let data = []
let route = []
    // init du slider (qui peut aussi faire des fondus enchainé)
let mySlidr = slidr.create('slidr', {
    breadcrumbs: true,
    controls: 'none',
    direction: 'horizontal',
    fade: false,
    keyboard: true,
    overflow: true,
    pause: false,
    theme: '#222',
    timing: { 'linear': '1.5s ease-in' },
    touch: true,
    transition: 'linear'
}).start();


function nextSlide(page, data) {
    string = 'page-' + page
    console.log("Trig")
    mySlidr.slide(string);
    choixSlide(page, data);
}

function choixSlide(num, data) {

    if (num == '1_1') { initSlide1_1(data) }

    if (num == '2') { initSlide2(data) }

    if (num == '3') { initSlide3(data) }

    if (num == '4') { initSlide4(data) }

    if (num == '5') { initSlide5(data) }

    if (num == '6') { initSlide6(data) }

    if (num == '7') { initSlide7(data) }

    if (num == '8') { initSlide8(data) }

    if (num == '9') { initSlide9(data) }

    if (num == '10') { initSlide10(data) }

    if (num == 'resultats') { initSlideResultat(data) }
}

//Transition quand appuie sur logo page 1
let initSlide1 = function() {

    d3.select('#logo').on('click', function() {
        nextSlide('1_1');
    });
}

//Slide de transi 
let initSlide1_1 = function() {

    //Transi 1.2 vers 2(Camille) 
    d3.select('#t').on('click', function() {
        nextSlide('2');
    });
}

/*
let initSlide2 = function() {
    setTimeout(suiteTraitement, 1000)
    function suiteTraitement()
    {
        mySlidr.slide('page-2.1');
        initSlide2_1();
    }
}*/


function disappear(id) {
    d3.select(id)
        .transition()
        .duration(700)
        .style("opacity", 0)
}

function appear(id) {
    d3.select(id)
        .transition()
        .delay(600)
        .duration(700)
        .style("opacity", 1)
}

//Camille se présente
let initSlide2 = function() {
    //Transi Camille to Pret a démarrer 

    d3.select('#button-p2-1').on('click', function() {

        //Disparition de la 1 bulle 
        disappear('#disappear')
        disappear('#vector-p2-1')

        appear('#appear')
        appear('#vector-p2-1')

    });

    //transi next slide
    d3.select('#button2-p2-2').on('click', function() {
        nextSlide('3')
        route.push('2');
    });
    //Retour arriere
    d3.select('.button_retour').on('click', function() {
        nextSlide('1')
    });

}


//Premiere question : aventurier ? 
let initSlide3 = function() {
    //Aventurier -> Plein la vue
    d3.select('#bouton_non_aventurier_anime-p3').on('click', async function() {
        data = await fetch("/parents-a/parc/non-aventurier", { mode: 'no-cors' }).then(response => response.json()).then(d => { return d });
        nextSlide('7', data);
        route.push('3');
        console.log(data);
    });
    d3.select('#bouton_aventurier_anime-p3').on('click', async function() {
        data = await fetch("/parents-a/parc/aventurier", { mode: 'no-cors' }).then(response => response.json()).then(d => { return d });
        nextSlide('4', data);
        route.push('3');
        console.log(data);

    });
    //Retour arriere
    d3.selectAll('.button_retour').on('click', function() {
        nextSlide(route.pop());
    });
}

//Plein la vue 
let initSlide4 = function() {
    //Plein la vue -> avec quoi 
    d3.select("#oh_oui_anime-p4").on('click', async function() {
        data = await fetch("/parents-a/parc/aventurier/plein-la-vue", { method: "POST", body: JSON.stringify({ "data": data }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        nextSlide('5', data);
        route.push('4');
        console.log(data);
    });
    d3.select("#mais_non_anime-p4").on('click', async function() {
        nextSlide('9', data);
        route.push('4');
        console.log(data);
    });
    //Retour arriere
    d3.selectAll('.button_retour').on('click', function() {
        nextSlide(route.pop());
    });
}

//Okey mais Avec quoi
let initSlide5 = function() {
    //Plein la vue -> avec quoi 
    d3.select("#button_oui-p5").on('click', async function() {
        data = await fetch("/parents-a/parc/aventurier/plein-la-vue/beau-decor", { method: "POST", body: JSON.stringify({ "data": data }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        nextSlide('10', data);
        route.push('5');
        console.log(data);
    });
    d3.select("#button_non-p5").on('click', async function() {
        data = await fetch("/parents-a/parc/aventurier/plein-la-vue/beau-paysage", { method: "POST", body: JSON.stringify({ "data": data }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        nextSlide('9', data);
        route.push('5');
        console.log(data);
    });
    //Retour arriere
    d3.selectAll('.button_retour').on('click', function() {
        nextSlide(route.pop());
    });
}

let initSlide6 = function(db) {
    d3.select("#bouton_oh_oui_anime-p6").on('click', async function() {
        data = await fetch("/parents-a/parc/non-aventurier/nature/parfums", { method: "POST", body: JSON.stringify({ "data": data }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        checkData(data, db, 10);
        nextSlide('10', data); //FINAL SLIDE
        route.push('6');
        console.log(data);
    });
    d3.select("#texte_mais_non-p6").on('click', async function() {
        data = await fetch("/parents-a/parc/non-aventurier/nature", { method: "POST", body: JSON.stringify({ "data": data }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        checkData(data, db, 10)
        nextSlide('10', data); //FINAL SLIDE
        route.push('6');
        console.log(data);
    });
    d3.selectAll('.button_retour').on('click', function() {
        nextSlide(route.pop());
    });
}

//Preference entre animaux et bruits nature 
let initSlide7 = function() {

    d3.select("#bouton_oui_p7").on('click', async function() {
        data = await fetch("/parents-a/parc/non-aventurier/animaux/decouvrir-arbres", { method: "POST", body: JSON.stringify({ "data": data }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        nextSlide('8', data);
        route.push('7');
        console.log(data);
    });
    d3.select("#bouton_non_p7").on('click', async function() {
        data = await fetch("/parents-a/parc/non-aventurier/nature", { method: "POST", body: JSON.stringify({ "data": data }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        nextSlide('6', data);
        route.push('7');
        console.log(data);
    });
    d3.selectAll('.button_retour').on('click', function() {
        nextSlide(route.pop());
    });
}

// /Decouverte d'arbres différents 
let initSlide8 = function() {

    d3.select("#BOUTON_ARBRES_v2-p8").on('click', async function() {
        data = await fetch("/parents-a/parc/non-aventurier/animaux", { method: "POST", body: JSON.stringify({ "data": data }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        nextSlide('6', data);
        route.push('8');
        console.log(data);
    });
    d3.select("#BOUTON_BOUDE-ARBRES_v2-p8").on('click', async function() {
        data = await fetch("/parents-a/parc/non-aventurier/nature", { method: "POST", body: JSON.stringify({ "data": data }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        nextSlide('10', data); //final slide
        route.push('8');
        console.log(data);
    });
    d3.selectAll('.button_retour').on('click', function() {
        nextSlide(route.pop());
    });
}

let initSlide9 = function(db) {

    d3.select("#animaux-heureux-p9").on('click', async function() {
        data = await fetch("/parents-a/parc/aventurier/plein-la-vue/beau-paysage/avec-animaux", { method: "POST", body: JSON.stringify({ "data": data }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        checkData(data, db, 10);
        nextSlide('10', data);
        route.push('9');
        console.log(data);
    });
    d3.select("#BOUTON_NON_ANIMAUX-sourcils-p9").on('click', async function() {
        checkData(data, db, 10);
        nextSlide('10', data);
        route.push('9');
        console.log(data);
    });
    d3.selectAll('.button_retour').on('click', function() {
        nextSlide(route.pop());
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomParc(target, source) {
    let index = 0;
    while (target.find(p => p.id === source[index].id)) {
        index = getRandomInt(source.length);
    }
    target.push(source[index]);
}

function checkData(d, db, max) {
    if (d.length < max && db.length >= max) {
        console.log('Resultats inferieurs à ' + max);
        for (var i = d.length; i < max; i++) {
            getRandomParc(d, db);
        }
    }
}

let initSlide10 = function(db) {

    d3.select("#sud-p10").on('click', async function() {
        data = await fetch("/parents-a/parc/Sud", { method: "POST", body: JSON.stringify({ "data": data }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        checkData(data, db, 3);
        nextSlide('resultats', data);
        route.push('10');
        console.log(data);
    });
    d3.select("#ouest-p10").on('click', async function() {
        data = await fetch("/parents-a/parc/Ouest", { method: "POST", body: JSON.stringify({ "data": data }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        checkData(data, db, 3);
        nextSlide('resultats', data);
        route.push('10');
        console.log(data);
    });
    d3.select("#nord-est-p10").on('click', async function() {
        data = await fetch("/parents-a/parc/Nord", { method: "POST", body: JSON.stringify({ "data": data }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        checkData(data, db, 3);
        nextSlide('resultats', data);
        route.push('10');
        console.log(data);
    });
    d3.select("#centre-p10").on('click', async function() {
        data = await fetch("/parents-a/parc/Centre", { method: "POST", body: JSON.stringify({ "data": data }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        checkData(data, db, 3);
        nextSlide('resultats', data);
        route.push('10');
        console.log(data);
    });
    d3.selectAll('.button_retour').on('click', function() {
        nextSlide(route.pop());
    });
}

//
let initSlideResultat = function(db) {

    d3.select("#animaux-heureux-p9").on('click', async function() {
        data = await fetch("/parents-a/parc/aventurier/plein-la-vue/beau-paysage/avec-animaux", { method: "POST", body: JSON.stringify({ "data": data }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        nextSlide('10', data);
        console.log(data);
    });
    d3.select("#BOUTON_NON_ANIMAUX-sourcils-p9").on('click', async function() {
        nextSlide('10', data);
        console.log(data);
    });
    d3.selectAll('.button_retour').on('click', function() {
        nextSlide('10')
    });
    radar(data);
}


function radar(data) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ["Nombre d'arbres ", "Nombre d'arbres formidables", 'Diversité des arbres', 'Diversié des fleurs'],
            datasets: [{
                    label: data[0]['Nom formel'],
                    backgroundColor: 'rgba(84,226,136, 0.5)',
                    data: [data[0]['Nb arbre'], data[0]['Nb arbre formidable'], data[0]['Nb espece arbre'], data[0]['Nb Espece plantes']]
                },
                {
                    label: data[1]['Nom formel'],
                    backgroundColor: 'rgba(84,155,226, 0.5)',
                    data: [data[1]['Nb arbre'], data[1]['Nb arbre formidable'], data[1]['Nb espece arbre'], data[1]['Nb Espece plantes']],
                },
                {
                    label: data[2]['Nom formel'],
                    backgroundColor: 'rgba(215,17,23, 0.5)',
                    data: [data[2]['Nb arbre'], data[2]['Nb arbre formidable'], data[2]['Nb espece arbre'], data[2]['Nb Espece plantes']]
                }
            ]
        },


        options: {
            scale: {
                angleLines: {
                    display: true
                },
                ticks: {
                    suggestedMin: 50,
                    suggestedMax: 100
                }
            },
            layout: {
                padding: {
                    left: 50,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            }

        }
    });
}

initSlide1();