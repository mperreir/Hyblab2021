






var nonDatedata = [
    {
        "img": "./img/timeline/kisspng-bakery-brunch-bread-icon-bread-5a98b1a9839131.1352693715199563935389.png",
        "categorie": "Boulangerie",
        "data": [
            { temps: 0, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
            { temps: 3, nom: "Boulang2", adresse: "12 Rue XXXX XX XX" },
            { temps: 5, nom: "Boulang3", adresse: "4 Rue XXX XX XXX" },
        ]
    },
    {
        "img": "./img/timeline/pharma.png",
        "categorie": "Pharmacie",
        "data": [
            { temps: 3, nom: "Boulang2", adresse: "12 Rue XXXX XX XX" },
            { temps: 6, nom: "Boulang3", adresse: "4 Rue XXX XX XXX" },
        ]
    },
    {
        "img": "./img/timeline/ecole.png",
        "categorie": "Ecole",
        "data": [
            { temps: 4, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
            { temps: 5, nom: "Boulang3", adresse: "4 Rue XXX XX XXX" },
        ]
    },
    {
        "img": "./img/timeline/supermarche.jpg",
        "categorie": "Supermache",
        "data": [
            { temps: 7, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
            { temps: 9, nom: "Boulang3", adresse: "4 Rue XXX XX XXX" },
        ]
    },
    {
        "img": "./img/timeline/eglise.png",
        "categorie": "Eglise",
        "data": [
            { temps: 8, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
            { temps: 9, nom: "Boulang2", adresse: "12 Rue XXXX XX XX" },
        ]
    },

    {
        "img": "./img/timeline/parc.jpg",
        "name": "Parc",
        "data": [
            { temps: 15, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
        ]
    }
];


var nonDatedata2 = [
    {
        "img": "./img/timeline/kisspng-bakery-brunch-bread-icon-bread-5a98b1a9839131.1352693715199563935389.png",
        "categorie": "Boulangerie",
        "data": [
            { temps: 0, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
            { temps: 3, nom: "Boulang2", adresse: "12 Rue XXXX XX XX" },
            { temps: 5, nom: "Boulang3", adresse: "4 Rue XXX XX XXX" },
        ]
    },
    {
        "img": "./img/timeline/pharma.png",
        "categorie": "Pharmacie",
        "data": [
            { temps: 1, nom: "Boulang2", adresse: "12 Rue XXXX XX XX" },
            { temps: 6, nom: "Boulang3", adresse: "4 Rue XXX XX XXX" },
        ]
    },
    {
        "img": "./img/timeline/ecole.png",
        "categorie": "Ecole",
        "data": [
            { temps: 6, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
            { temps: 8, nom: "Boulang3", adresse: "4 Rue XXX XX XXX" },
        ]
    },
    {
        "img": "./img/timeline/supermarche.jpg",
        "categorie": "Supermache",
        "data": [
            { temps: 15, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
            { temps: 15, nom: "Boulang3", adresse: "4 Rue XXX XX XXX" },
        ]
    },
    {
        "img": "./img/timeline/eglise.png",
        "categorie": "Eglise",
        "data": [
            { temps: 2, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
            { temps: 9, nom: "Boulang2", adresse: "12 Rue XXXX XX XX" },
        ]
    },

    {
        "img": "./img/timeline/parc.jpg",
        "name": "Parc",
        "data": [
            { temps: 5, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
        ]
    }
];



function drawTimeLine(){
    console.log("fds")
    var widthCard = ($("#timelineholder").width());
    console.log(widthCard);
    TimeKnots.draw("#timelineNonDate", nonDatedata, { dateDimension: false, color: "teal", width: widthCard, showLabels: true, labelFormat: "%Y" });
    TimeKnots.draw("#timelineNonDate2", nonDatedata2, { dateDimension: false, color: "teal", width: widthCard, showLabels: true, labelFormat: "%Y" });

};

window.addEventListener("resize", drawTimeLine);


drawTimeLine();
