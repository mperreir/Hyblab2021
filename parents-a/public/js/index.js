//Mon objet stockant mes données 
let data = []
let route = []
let soundBack;;


// init du slider (qui peut aussi faire des fondus enchainé)
let mySlidr = slidr.create('slidr', {
    breadcrumbs: false,
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

    if (num == '1-1') { initSlide1_1(data) }

    if (num == '2') { initSlide2(data) }

    if (num == '2-1') { initSlide2_1(data) };

    if (num == '3') { initSlide3(data) };

    if (num == '4') { initSlide4(data) };

    if (num == '5') { initSlide5(data) }

    if (num == '6') { initSlide6(data) }

    if (num == '7') { initSlide7(data) }

    if (num == '8') { initSlide8(data) }

    if (num == '9') { initSlide9(data) }

    if (num == '10') { initSlide10(data) }

    if (num == 'resultats') { initSlideResultat(data) }

    if (num == 'credits') { initSlideCredit(data) }

}

let loadComponent = function(p) {
    console.log(p);
    document.querySelectorAll(`#page-${p} > img`).forEach(elem => {
        elem.setAttribute("src", elem.getAttribute("data-src"));
    });
}

let playSoundFlore = function() {
    const s = new sound('sound/bruitFeuille.mp3', true, 0.2);
    s.play();
}

let playSoundEleph = function() {
    const s = new sound('sound/elephant8.mp3', true, 0.2);
    s.play();
}

//Transition quand appuie sur logo page 1
let initSlide1 = function() {
    // d3.select('#logo').on('click', function() {
    //Traitement
    setTimeout(fonctionAExecuter, 3000); //On attend 5 secondes avant d'exécuter la fonction
}
function fonctionAExecuter()
{
    soundBack = new sound('sound/back.mp3', true, 0.1);
    soundBack.play();
    isPlayed = true;
    muteBack();
    loadComponent(2);
    nextSlide('1-1');
    //Le code écrit dans cette fonction ne sera exécuté qu'au bout de 5 secondes
}

    // });



function muteBack() {
    const btn = document.getElementsByClassName('mute');
    for (const b of btn) {
        b.addEventListener('click', () => {
            isPlayed === true ? soundBack.changeVolume(0) : soundBack.changeVolume(0.2);
            isPlayed = !isPlayed;
        });
    }
}

//Slide de transi 
let initSlide1_1 = function() {

    d3.selectAll('.arbre').on('mouseover', function() {
        playSoundFlore();
    });


    setTimeout(fonctionAExecuter2, 2000); //On attend 5 secondes avant d'exécuter la fonction
}
function fonctionAExecuter2()
{
    nextSlide('2');
}


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

    d3.selectAll('.arbre').on('mouseover', function() {
        playSoundFlore();
    });

    d3.select('#mascotte-p2').on('mouseover', function() {
        playSoundEleph();
    });

    d3.select('#button-p2').on('click', function() {

        //Disparition de la 1 bulle 
        disappear('#disappear')
        disappear('#vector-p2-1')

        appear('#appear')
        appear('#vector-p2-1')
        loadComponent('2-1')
        loadComponent('3')
    });

    //transi next slide
    d3.select('#button2-p2').on('click', function() {
        nextSlide('2-1')
        route.push('2');

    });
}

//Age ?
let initSlide2_1 = function() {

    //Age -> Aventurier
    //recupérer l'age

    d3.select('#trois-ans-mascotte-p2-1').on('click', async function() {
        console.log(d3.event.target.id);
        nextSlide('3');
    });

    d3.select('#six-ans-mascotte-p2-1').on('click', async function() {
        console.log(d3.event.target.id);
        nextSlide('3');
    });

    d3.select('#neuf-ans-mascotte-p2-1').on('click', async function() {
        console.log(d3.event.target.id);
        nextSlide('3');

    });

    muteBack();
    //Retour arriere
    d3.selectAll('.button_retour').on('click', function(e) {
        console.log(d3.event.target.id);
        nextSlide('2')
    });
    //Retour accueil
    d3.selectAll('.home').on('click', function() {
        nextSlide('2');
    });
}

//Premiere question : aventurier ? 
let initSlide3 = function() {
    /* Chargements des images des slides 4 et 7 */
    loadComponent('4');
    loadComponent('7');
    //Aventurier -> Plein la vue

    d3.selectAll('.arbre').on('mouseover', function() {
        playSoundFlore();
    });
    d3.select('#bouton-droite-p3').on('click', async function() {
        data = await fetch("/parents-a/parc/non-aventurier", { mode: 'no-cors' }).then(response => response.json()).then(d => { return d });
        nextSlide('7', data);
        route.push('3');
        console.log(data);
    });
    d3.select('#bouton-gauche-p3').on('click', async function() {
        data = await fetch("/parents-a/parc/aventurier", { mode: 'no-cors' }).then(response => response.json()).then(d => { return d });
        nextSlide('4', data);
        route.push('3');
        console.log(data);
    });
    //Retour arriere
    d3.selectAll('.button_retour').on('click', function() {
        nextSlide('2-1', data);
    });

    muteBack();
    //Retour accueil
    d3.selectAll('.home').on('click', function() {
        nextSlide('2');
    });
}

//Plein la vue 
let initSlide4 = function(db) {
    /* Chargements des images des slides 9 et 5 */
    loadComponent('9');
    loadComponent('5')

    //Plein la vue -> avec quoi
    d3.select("#bouton-gauche-p4").on('click', async function() {
        data = await fetch("/parents-a/parc/aventurier/plein-la-vue", { method: "POST", body: JSON.stringify({ "data": db }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        nextSlide('5', data);
        route.push('4');
        console.log(data);
    });
    d3.select("#bouton-droite-p4").on('click', async function() {
        nextSlide('9', data);
        route.push('4');
        console.log(data);
    });
    //Retour arriere
    d3.selectAll('.button_retour').on('click', function() {
        nextSlide(route.pop());
    });
    muteBack();
    //Retour accueil
    d3.selectAll('.home').on('click', function() {
        nextSlide('2');
    });
}

//Okey mais Avec quoi
let initSlide5 = function(db) {
    /* Chargements des images des slides 9 et 10 */
    loadComponent('9');
    loadComponent('10');

    d3.selectAll('.arbre').on('mouseover', function() {
        playSoundFlore();
    });
    //Plein la vue -> avec quoi 
    d3.select("#button-gauche-p5").on('click', async function() {
        data = await fetch("/parents-a/parc/aventurier/plein-la-vue/beau-decor", { method: "POST", body: JSON.stringify({ "data": db }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        const stone = new sound('sound/stone.mp3', true, 0.2);
        stone.play()
        nextSlide('10', data);
        route.push('5');
        console.log(data);
    });
    d3.select("#button-droite-p5").on('click', async function() {
        data = await fetch("/parents-a/parc/aventurier/plein-la-vue/beau-paysage", { method: "POST", body: JSON.stringify({ "data": db }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        const water = new sound('sound/water.mp3', true, 0.2);
        water.play()
        nextSlide('9', data);
        route.push('5');
        console.log(data);
    });
    //Retour arriere
    d3.selectAll('.button_retour').on('click', function() {
        nextSlide(route.pop());
    });
    //Retour accueil
    d3.selectAll('.home').on('click', function() {
        nextSlide('2');
    });
    muteBack();
}


let initSlide6 = function(db) {
    /* Chargements des images de la slide 10 */
    loadComponent('10');

    d3.selectAll('.arbre').on('mouseover', function() {
        playSoundFlore();
    });
    d3.select("#boutton-gauche-p6").on('click', async function() {
        data = await fetch("/parents-a/parc/non-aventurier/nature/parfums", { method: "POST", body: JSON.stringify({ "data": db }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        checkData(data, db, 10);
        nextSlide('10', data); //FINAL SLIDE
        route.push('6');
        console.log(data);
    });
    d3.select("#bouton-droite-p6").on('click', async function() {
        data = await fetch("/parents-a/parc/non-aventurier/nature", { method: "POST", body: JSON.stringify({ "data": db }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        checkData(data, db, 10)
        nextSlide('10', data); //FINAL SLIDE
        route.push('6');
        console.log(data);
    });
    d3.selectAll('.button_retour').on('click', function() {
        nextSlide(route.pop(), db);
    });
    //Retour accueil
    d3.selectAll('.home').on('click', function() {
        nextSlide('2');
    });
    muteBack();
}


//Preference entre animaux et bruits nature 
let initSlide7 = function(db) {
    /* Chargements des images des slides 6 et 5 */
    loadComponent('6');
    loadComponent('8')

    d3.select("#bouton-gauche-p7").on('click', async function() {
        data = await fetch("/parents-a/parc/non-aventurier/animaux/decouvrir-arbres", { method: "POST", body: JSON.stringify({ "data": db }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        nextSlide('8', data);
        route.push('7');
        console.log(data);
    });
    d3.select("#bouton-droite-p7").on('click', async function() {
        data = await fetch("/parents-a/parc/non-aventurier/nature", { method: "POST", body: JSON.stringify({ "data": db }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        nextSlide('6', data);
        route.push('7');
        console.log(data);
    });
    d3.selectAll('.button_retour').on('click', function() {
        nextSlide(route.pop(), db);
    });
    //Retour accueil
    d3.selectAll('.home').on('click', function() {
        nextSlide('2');
    });
    muteBack();
}

// /Decouverte d'arbres différents 


let initSlide8 = function(db) {
    /* Chargements des images des slides 6 et 10 */
    loadComponent('6');
    loadComponent('10');

    d3.selectAll('.arbre').on('mouseover', function() {
        playSoundFlore();
    });
    d3.select("#bouton-gauche-p8").on('click', async function() {
        data = await fetch("/parents-a/parc/non-aventurier/animaux", { method: "POST", body: JSON.stringify({ "data": db }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        nextSlide('6', data);
        route.push('8');
        console.log(data);
    });
    d3.select("#bouton-droite-p8").on('click', async function() {
        data = await fetch("/parents-a/parc/non-aventurier/nature", { method: "POST", body: JSON.stringify({ "data": db }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        nextSlide('10', data); //final slide
        route.push('8');
        console.log(data);
    });
    d3.selectAll('.button_retour').on('click', function() {
        nextSlide(route.pop(), db);
    });
    muteBack();
    //Retour accueil
    d3.selectAll('.home').on('click', function() {
        nextSlide('2');
    });
}

let initSlide9 = function(db) {
    /* Chargements des images de la slide 10 */
    loadComponent('10');


    d3.selectAll('.arbre').on('mouseover', function() {
        playSoundFlore();
    });

    d3.select("#bouton-gauche-p9").on('click', async function() {
        data = await fetch("/parents-a/parc/aventurier/plein-la-vue/beau-paysage/avec-animaux", { method: "POST", body: JSON.stringify({ "data": db }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        checkData(data, db, 8);
        nextSlide('10', data);
        route.push('9');
        console.log(data);
    });
    d3.select("#bouton-droite-p9").on('click', async function() {
        checkData(data, db, 8);
        nextSlide('10', data);
        route.push('9');
        console.log(data);
    });
    d3.selectAll('.button_retour').on('click', function() {
        nextSlide(route.pop(), db);
    });
    //Retour accueil
    d3.selectAll('.home').on('click', function() {
        nextSlide('2');
    });
    muteBack();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomParc(target, source) {
    let index = 0;

    while (index < source.length && target.find(p => p.id === source[index].id)) {
        index++;
    }
    if (index < source.length) {
        target.push(source[index]);
        return true;
    } else {
        console.log('not found');
        return false;
    }
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
    /* Chargements des images de la slide resultats */
    loadComponent('resultats');

    d3.selectAll('.arbre').on('mouseover', function() {
        playSoundFlore();
    });
    d3.select("#sud-hover-p10").on('click', async function() {
        data = await fetch("/parents-a/parc/Sud", { method: "POST", body: JSON.stringify({ "data": db }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        checkData(data, db, 3);
        nextSlide('resultats', data);
        route.push('10');
        console.log(data);
    });
    d3.select("#ouest-hover-p10").on('click', async function() {
        data = await fetch("/parents-a/parc/Ouest", { method: "POST", body: JSON.stringify({ "data": db }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        checkData(data, db, 3);
        nextSlide('resultats', data);
        route.push('10');
        console.log(data);
    });
    d3.select("#nord-est-hover-p10").on('click', async function() {
        data = await fetch("/parents-a/parc/Nord", { method: "POST", body: JSON.stringify({ "data": db }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        checkData(data, db, 3);
        nextSlide('resultats', data);
        route.push('10');
        console.log(data);
    });
    d3.select("#centre-hover-p10").on('click', async function() {
        data = await fetch("/parents-a/parc/Centre", { method: "POST", body: JSON.stringify({ "data": db }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        checkData(data, db, 3);
        nextSlide('resultats', data);
        route.push('10');
        console.log(data);
    });
    d3.select('#bouton-peu-importe-p10').on('click', async function() {
        checkData(data, db, 3);
        nextSlide('resultats', data);
        route.push('10');
    });
    muteBack();
    d3.selectAll('.button_retour').on('click', function() {
        nextSlide(route.pop(), db);
    });

    d3.selectAll('.home').on('click', function() {
        nextSlide('2');
    });
}

//
let initSlideResultat = function(db) {
    /* Chargements des images de la slide credits */
    loadComponent('credits');
    const charts = ['chart', 'chart1', 'chart2', 'chart3'];
    const myCharts = ['myChart', 'myChart1', 'myChart2', 'myChart3'];
    const containers = ['parc1-pr', 'parc2-pr', 'parc3-pr'];
    playSoundEleph();

    d3.select("#bouton-gauche-p9").on('click', async function() {
        data = await fetch("/parents-a/parc/aventurier/plein-la-vue/beau-paysage/avec-animaux", { method: "POST", body: JSON.stringify({ "data": db }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        nextSlide('10', data);
        console.log(data);
    });

    d3.select("#bouton-droite-p9").on('click', async function() {
        nextSlide('10', data);
        console.log(data);
    });
    d3.select('#parc1-titre').text(function(d) { return data[2]['Nom formel'] });
    d3.select('#parc2-titre').text(function(d) { return data[1]['Nom formel'] });
    d3.select('#parc3-titre').text(function(d) { return data[0]['Nom formel'] });

    d3.select('#credits-b').on('click', function() {
        nextSlide('credits')
    });

    muteBack();
    d3.select('#random2').on('click', () => {
        console.log('random 2');
        console.log(db);
        if (getRandomParc(podium, db)) {
            d3.select('#parc2-titre').text(function(d) { return podium[podium.length - 1]['Nom formel'] });
            podium[1] = podium[podium.length - 1];
            chooseimage(podium, div2);
            clearElement(charts);
            addCanvas(charts, myCharts);
            new radar(podium[0], podium[1], podium[2]);
            d3.selectAll(".parc2").on("click", () => {
                giveInfo(podium, 2)
            });
        }
    });
    d3.select('#random1').on('click', () => {
        console.log('random 2');
        console.log(db);
        if (getRandomParc(podium, db)) {
            d3.select('#parc1-titre').text(function(d) { return podium[podium.length - 1]['Nom formel'] });
            podium[2] = podium[podium.length - 1];
            chooseimage(podium, div1);
            clearElement(charts);
            addCanvas(charts, myCharts);
            new radar(podium[0], podium[1], podium[2]);
            d3.selectAll(".parc1").on("click", () => {
                giveInfo(podium, 1)
            });
        }
    });
    d3.select('#random3').on('click', () => {
        console.log('random 3');
        console.log(db);
        if (getRandomParc(podium, db)) {
            d3.select('#parc3-titre').text(function(d) { return podium[podium.length - 1]['Nom formel'] });
            podium[0] = podium[podium.length - 1];
            chooseimage(podium, div3);
            clearElement(charts);
            addCanvas(charts, myCharts);
            new radar(podium[0], podium[1], podium[2]);
            d3.selectAll(".parc3").on("click", () => {
                giveInfo(podium, 3)
            });
        }
    });
    ////////////////////////////////////:

    // d3.select('.parc1').on('click', () => {

    // });
    let podium = [data[0], data[1], data[2]]
    new radar(podium[0], podium[1], podium[2]);
    const div1 = document.getElementById("parc1-pr")
    console.log(div1.id);
    const img1 = document.createElement("img")
    const div2 = document.getElementById("parc2-pr")
    const img2 = document.createElement("img")
    const div3 = document.getElementById("parc3-pr")
    const img3 = document.createElement("img")
    div1.appendChild(img1)
    console.log(div1.firstChild);
    chooseimage(data, div1);
    div2.appendChild(img2);
    chooseimage(data, div2);
    div3.appendChild(img3);
    chooseimage(data, div3);

    d3.selectAll(".parc1").on("click", () => {
        giveInfo(podium, 1)
    });
    d3.selectAll(".parc2").on("click", () => {
        giveInfo(podium, 2)
    });
    d3.selectAll(".parc3").on("click", () => {
        giveInfo(podium, 3)
    });

    d3.selectAll('.button_retour').on('click', function() {
        nextSlide(route.pop(), db);
    });

    d3.selectAll('.home').on('click', function() {
        clearElement(containers);
        nextSlide('2');
    });

}

let initSlideCredit = function(db) {

    d3.selectAll('.home').on('click', function() {
        nextSlide('2')
    });

    d3.selectAll('.button_retour').on('click', function() {
        nextSlide('resultats')
    });
}

let im_sources = {
        "ILE DE VERSAILLES": "img/parcs/ile-de-versailles.jpg",
        "PLANTES": "img/parcs/jardin-des-plantes.jpg",
        "BEAULIEU": "img/parcs/parc-de-beaulieu.jpg",
        "BEAUJOIRE": "img/parcs/parc-de-la-beaujoire.jpg",
        "CHANTRERIE": "img/parcs/Parc-de-la-Chantrerie.jpg",
        "PROCE": "img/parcs/Parc-de-proce-Nantes.jpg",
        "LE OBLATES": "img/parcs/Parc-des-oblates-Nantes.jpg",
        "BLOTTEREAU": "img/parcs/parc-du-grand-bloterreau.jpg"
    }
    // parc 1 data[2]  // parc 2 data[1] // parc 3  data[0]
function giveInfo(data, id) {
    let num
    if (id === 1) {
        num = 2
    }
    if (id === 2) {
        num = 1
    }
    if (id === 3) {
        num = 0
    }
    if (data[num]['Descriptif'] !== null) {
        d3.select('#desc').text(function(d) { return data[num]['Descriptif'] });
    } else {
        // document.getElementById("divdesc").style.display = "none";
        d3.select('#desc').text(function(d) { return "Bientôt disponible !!!" });
    }
    d3.select('#titre-parc').text(function(d) { return data[num]['Nom formel'] });
    d3.select('#addr').text(function(d) { return data[num]['Adresse'] + ", " + data[num]['Code postal'] });
    d3.select('#acces').text(function(d) { return data[num]['Acces transports en commun'] });
    d3.select('#wc').text(function(d) { return data[num]['Sanitaires'] });
    d3.select('#handi').text(function(d) { return data[num]['Sanitaires pour handicapés'] });
    d3.select('#dog').text(function(d) { return data[num]['Chiens autorisés'] });
    d3.select('#table').text(function(d) { return data[num]['Table pique-nique'] });

}

function chooseimage(data, div) {
    var num = div.id.match(/\d+/g);
    console.log(num[0]);
    Object.keys(im_sources).forEach(d => {
        if (num[0] === "1") {
            if (data[2]['Nom'] === d) {
                div.firstChild.src = im_sources[d]
            }

        }
        if (num[0] === "2") {
            if (data[1]['Nom'] === d) {
                div.firstChild.src = im_sources[d]
            }

        }
        if (num[0] === "3") {
            if (data[0]['Nom'] === d) {
                div.firstChild.src = im_sources[d]
            }
        }

    });
    if (num[0] === "1" && div.firstChild.src === "" || div.firstChild.src === undefined) {
        div.firstChild.src = "img/parcs/lambda-1.jpg"
    }
    if (num[0] === "2" && div.firstChild.src === "" || div.firstChild.src === undefined) {
        div.firstChild.src = "img/parcs/lambda-2.jpg"
    }
    if (num[0] === "3" && div.firstChild.src === "" || div.firstChild.src === undefined) {
        div.firstChild.src = "img/parcs/download.jpeg"
    }
}



function radar(parc1, parc2, parc3) {
    /*
    this.random_1 = parc1;
    this.random_2 = parc2;
    this.random_3 = parc3;
    */

    var fleurs = document.getElementById('myChart').getContext('2d');
    this.Fleurs = new Chart(fleurs, {
        type: 'bar',
        data: {
            labels: ["Nombre d'espèces de fleurs"],
            datasets: [{
                    label: parc1['Nom formel'],
                    backgroundColor: 'rgba(226,226,83, 0.5)',
                    data: [parc1['Nb Espece plantes']]
                },
                {
                    label: parc2['Nom formel'],
                    backgroundColor: 'rgba(227,155,84, 0.5)',
                    data: [parc2['Nb Espece plantes']],
                },
                {
                    label: parc3['Nom formel'],
                    backgroundColor: 'rgba(215,17,23, 0.5)',
                    data: [parc3['Nb Espece plantes']]
                }
            ]
        },
        options: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                fontSize: 14,
                fontColor: '#fff',
                position: 'bottom'
            }

        }
    });
    var nbarbre = document.getElementById('myChart1').getContext('2d');
    this.NbArbre = new Chart(nbarbre, {
        type: 'bar',
        data: {
            labels: ["Nombre d'arbres "],
            datasets: [{
                    label: parc1['Nom formel'],
                    backgroundColor: 'rgba(226,226,83, 0.5)',
                    data: [parc1['Nb arbre']]
                },
                {
                    label: parc2['Nom formel'],
                    backgroundColor: 'rgba(227,155,84, 0.5)',
                    data: [parc2['Nb arbre']],
                },
                {
                    label: parc3['Nom formel'],
                    backgroundColor: 'rgba(215,17,23, 0.5)',
                    data: [parc3['Nb arbre']]
                }
            ]
        },


        options: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                fontSize: 14,
                fontColor: '#fff',
                position: 'bottom'
            }

        }
    });
    var arbreFor = document.getElementById('myChart2').getContext('2d');
    this.ArbreFor = new Chart(arbreFor, {
        type: 'bar',
        data: {
            labels: ["Nombre d'arbres formidables"],
            datasets: [{
                    label: parc1['Nom formel'],
                    backgroundColor: 'rgba(226,226,83, 0.5)',
                    data: [parc1['Nb arbre formidable']]
                },
                {
                    label: parc2['Nom formel'],
                    backgroundColor: 'rgba(227,155,84, 0.5)',
                    data: [parc2['Nb arbre formidable']],
                },
                {
                    label: parc3['Nom formel'],
                    backgroundColor: 'rgba(215,17,23, 0.5)',
                    data: [parc3['Nb arbre formidable']]
                }
            ]
        },
        options: {

            legend: {
                display: false,
            },
            title: {
                display: true,
                fontSize: 14,
                fontColor: '#fff',
                position: 'bottom'
            }

        }
    });
    var divArbre = document.getElementById('myChart3').getContext('2d');
    this.DivArbre = new Chart(divArbre, {
        type: 'bar',
        data: {
            labels: ["Nombre d'écpèce d'arbres"],
            datasets: [{
                    label: parc1['Nom formel'],
                    backgroundColor: 'rgba(226,226,83, 0.5)',
                    data: [parc1['Nb espece arbre']]
                },
                {
                    label: parc2['Nom formel'],
                    backgroundColor: 'rgba(227,155,84, 0.5)',
                    data: [parc2['Nb espece arbre']],
                },
                {
                    label: parc3['Nom formel'],
                    backgroundColor: 'rgba(215,17,23, 0.5)',
                    data: [parc3['Nb espece arbre']]
                }
            ]
        },


        options: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                fontSize: 14,
                fontColor: '#fff',
                position: 'bottom'
            }


        }
    });
}

function sound(src, loop, volume) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.volume = volume;
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
    this.stop = function() {
        this.sound.pause();
    }
    this.changeVolume = function(vol) {
        this.sound.volume = vol;
    }
}

function clearElement(list) {
    list.forEach(p => document.getElementById(p).innerHTML = '');
}

function addCanvas(containers, childs) {
    for (let i = 0; i < containers.length; i++) {
        const myChart = document.createElement('canvas');
        myChart.id = childs[i];
        document.getElementById(containers[i]).appendChild(myChart);
    }
}

initSlide1();