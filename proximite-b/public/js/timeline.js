






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
        "categorie": "Parc",
        "data": [
            { temps: 9, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
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
            { temps: 12, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
            { temps: 12, nom: "Boulang3", adresse: "4 Rue XXX XX XXX" },
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
        "categorie": "Parc",
        "data": [
            { temps: 5, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
        ]
    }
]; 


var tab1 = []
var tab2 = []
for (const [key, value] of Object.entries(nonDatedata)) {
    tab1.push((value.data)[value.data.length - 1].temps)
}
for (const [key, value] of Object.entries(nonDatedata2)) {
    tab2.push((value.data)[value.data.length - 1].temps)
}
max1 = Math.max(...tab1)
max2 = Math.max(...tab2)

if (max1>max2){
    console.log(nonDatedata2[0])
    onDatedata2.push( {
        "categorie": null,
        "data": [
            { temps: max1 },
        ]
    })
}
else if (max1<=max2){
    console.log(nonDatedata)
    nonDatedata.push( {
        "categorie  ": null,
        "data": [
            { temps: max2 },
        ]
    })
}

function drawTimeLine() {


   


    var widthCard = ($("#timelineholder").width());
    var heightCard = 300;
    TimeKnots.draw("#timelineNonDate", nonDatedata, {  dateDimension: false, color: "teal", width: widthCard, height: heightCard, showLabels: true, labelFormat: "%Y" });
    TimeKnots.draw("#timelineNonDate2", nonDatedata2, { dateDimension: false, color: "teal", width: widthCard, height: heightCard, showLabels: true, labelFormat: "%Y" });

};

window.addEventListener("resize", drawTimeLine);


drawTimeLine();
