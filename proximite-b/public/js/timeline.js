






var nonDatedata = [
    {
        "img": "./img/timeline/boulangerie.svg",
        "categorie": "Boulangerie",
        "data": [
            { temps: 1, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
            { temps: 3, nom: "Boulang2", adresse: "12 Rue XXXX XX XX" },
            { temps: 5, nom: "Boulang3", adresse: "4 Rue XXX XX XXX" },
        ]
    },
    {
        "img": "./img/timeline/pharmacie.svg",
        "categorie": "Pharmacie",
        "data": [
            
        ]
    },
    {
        "img": "./img/timeline/ecole.svg",
        "categorie": "Ecole",
        "data": [
           
        ]
    },
    {
        "img": "./img/timeline/market.svg",
        "categorie": "Supermache",
        "data": [
            { temps: 6, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
            { temps: 9, nom: "Boulang3", adresse: "4 Rue XXX XX XXX" },
        ]
    },
    {
        "img": "./img/timeline/doctor.svg",
        "categorie": "Docteur",
        "data": [
            { temps: 5, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
        ]
    },
    {
        "img": "./img/timeline/bus.svg",
        "categorie": "Bus",
        "data": [
            { temps: 7, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
        ]
    },
    {
        "img": "./img/timeline/park.svg",
        "categorie": "Parc",
        "data": [
            { temps: 9, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
        ]
    }
];


var nonDatedata2 = [
    {
        "img": "./img/timeline/boulangerie.svg",
        "categorie": "Boulangerie",
        "data": [
            { temps: 1, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
            { temps: 3, nom: "Boulang2", adresse: "12 Rue XXXX XX XX" },
            { temps: 5, nom: "Boulang3", adresse: "4 Rue XXX XX XXX" },
        ]
    },
    {
        "img": "./img/timeline/pharmacie.svg",
        "categorie": "Pharmacie",
        "data": [
            { temps: 8, nom: "Boulang2", adresse: "12 Rue XXXX XX XX" },
        ]
    },
    {
        "img": "./img/timeline/ecole.svg",
        "categorie": "Ecole",
        "data": [
            { temps: 3, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
            { temps: 5, nom: "Boulang3", adresse: "4 Rue XXX XX XXX" },
        ]
    },
    {
        "img": "./img/timeline/market.svg",
        "categorie": "Supermache",
        "data": [
            { temps: 5, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
            { temps: 9, nom: "Boulang3", adresse: "4 Rue XXX XX XXX" },
        ]
    },
    {
        "img": "./img/timeline/doctor.svg",
        "categorie": "Docteur",
        "data": [
            { temps: 14, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
        ]
    },
    {
        "img": "./img/timeline/bus.svg",
        "categorie": "Bus",
        "data": [
            { temps: 11, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
        ]
    },
    {
        "img": "./img/timeline/park.svg",
        "categorie": "Parc",
        "data": [
            { temps: 11, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
        ]
    }
];


var tab = []
for (const [key, value] of Object.entries(nonDatedata)) {
    if (value.data.length >=1) tab.push((value.data)[value.data.length - 1].temps)

}
for (const [key, value] of Object.entries(nonDatedata2)) {
    if (value.data.length >=1)  tab.push((value.data)[value.data.length - 1].temps)
}
max = Math.max(...tab)



nonDatedata = [{
    "categorie": null,
    "data": [
        { temps: 0 },
    ]
}, {
    "categorie": null,
    "data": [
        { temps: max },
    ]
}].concat(nonDatedata)

nonDatedata2 = [{
    "categorie": null,
    "data": [
        { temps: 0 },
    ]
}, {
    "categorie": null,
    "data": [
        { temps: max },
    ]
}].concat(nonDatedata2)

function drawTimeLine() {
    var widthCard = ($("#timelineholder").width());
    var heightCard = 300;
    TimeKnots.draw("#timelineNonDate", nonDatedata, { dateDimension: false, color: ["#2a315b","#eead1c"], width: widthCard, height: heightCard, showLabels: true, labelFormat: "%Y" });
    TimeKnots.draw("#timelineNonDate2", nonDatedata2, { dateDimension: false, color: ["#2a315b","#eead1c"], width: widthCard, height: heightCard, showLabels: true, labelFormat: "%Y" });
};

window.addEventListener("resize", drawTimeLine);



function progressBar(){
    console.log('prods')
    var valeur =20;
    $("#bar1").css('width', valeur+'%').attr('aria-valuenow', valeur);
}

progressBar();
drawTimeLine();
