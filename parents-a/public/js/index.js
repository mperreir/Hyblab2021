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


//Transition quand appuie sur logo page 1
let initSlide1 = function() {
    d3.select('#logo').on('click', function() {
        mySlidr.slide('page-1_1');
        initSlide1_1();
    });
}

//Slide de transi 
let initSlide1_1 = function() {
        //Transi 1.2 vers 2(Camille) 
        d3.select('#t').on('click', function() {
            mySlidr.slide('page-2');
            initSlide2();
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
        mySlidr.slide('page-3')
        initSlide3()
    });

}


//Premiere question : aventurier ? 
let initSlide3 = function() {
    //Aventurier -> Plein la vue
    d3.select('#bouton_non_aventurier-p3').on('click', function() {
        mySlidr.slide('page-4');
        initSlide4();
    });
}

//Plein la vue 
let initSlide4 = function() {
    //Plein la vue -> avec quoi 
    d3.select("#oh_oui_anime-p4").on('click', function() {
        mySlidr.slide('page-5');
        //initSlide5();
    });
}


let initSlide5 = function() {
    //Plein la vue -> avec quoi 
    d3.select("#button_oui-p5").on('click', function() {
        mySlidr.slide('page-6');
        initSlide6();
    });
}

let initSlide6 = function() {
    //Plein la vue -> avec quoi 
    d3.select("#bouton_oh_oui-p6").on('click', function() {
        mySlidr.slide('page-7');
        initSlide7();
    });
}

let initSlide7 = function() {
    console.log('arrived page 7 ');
};

//Initialisation du diaporama
initSlide1();