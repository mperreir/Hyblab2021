//Mon objet stockant mes données 
let data = []
    // init du slider (qui peut aussi faire des fondus enchainé)
let mySlidr = slidr.create('slidr', {
    breadcrumbs: true,
    controls: 'none',
    direction: 'horizontal',
    fade: true,
    keyboard: true,
    overflow: true,
    pause: false,
    theme: '#222',
    timing: { 'fade': '0.7s ease-in' },
    touch: true,
    transition: 'fade'
}).start();

function nextSlide(page,data) {
    string = 'page-' + page
    console.log("Trig")
    mySlidr.slide(string);
    choixSlide(page);
}

function choixSlide(num,data) {

    if (num == '1_1') { initSlide1_1(data) };
  
    if (num == '2') { initSlide2(data) };

    if (num =='3'){ initSlide3(data)};
    
    if (num =='4'){ initSlide4(data)};

    if (num == '5') { initSlide5(data) };

    if (num == '6') { initSlide6(data) };

    if (num == '7') { initSlide7(data) };

    if (num =='8'){ initSlide7(data)};
  
    if (num =='9'){ initSlide7(data)};

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
            nextSlide('2')
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
    });
    //Retour arriere
    d3.select('.button_retour').on('click', function() {
        nextSlide('1')
     });

}


//Premiere question : aventurier ? 
let initSlide3 = function() {
    //Aventurier -> Plein la vue


    d3.select('#bouton_non_aventurier-p3').on('click', async function() {
        data = await fetch("/parents-a/parc/aventurier", { mode: 'no-cors' }).then(response => response.json()).then(d => { return d });
         nextSlide('4',data);

    });
     //Retour arriere
     d3.selectAll('.button_retour').on('click', function() {
        nextSlide('2')
     });
}

//Plein la vue 
let initSlide4 = function(db) {
    //Plein la vue -> avec quoi 
    d3.select("#oh_oui_anime-p4").on('click', async function() {
        data = await fetch("/parents-a/parc/aventurier/plein-la-vue", { method: "POST", body: JSON.stringify({ "data": db }), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(response => response.json()).then(d => { return d });
        nextSlide('5',data);
    });
     //Retour arriere
     d3.selectAll('.button_retour').on('click', function() {
        nextSlide('3')
     });
}


let initSlide5 = function() {
    //Plein la vue -> avec quoi 
    d3.select("#button_oui-p5").on('click', function() {
        nextSlide('6')
    });
    //Retour arriere
    d3.selectAll('.button_retour').on('click', function() {
        nextSlide('4')
     });
}

let initSlide6 = function() {
    //Plein la vue -> avec quoi 
    d3.select("#bouton_oh_oui-p6").on('click', function() {
        nextSlide('7')
    });
    //Retour arriere
    d3.selectAll('.button_retour').on('click', function() {
        nextSlide('5')
     });
}

let initSlide7 = function() {
    console.log('arrived page 7 ');
};



//Initialisation du diaporama
initSlide1();