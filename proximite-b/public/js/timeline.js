






var dataTimeLine1 = [
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
        "data": null
    },
    {
        "img": "./img/timeline/ecole.svg",
        "categorie": "Ecole",
        "data": null
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


var dataTimeLine2 = [
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
for (const [key, value] of Object.entries(dataTimeLine1)) {
    if (value.data) tab.push((value.data)[value.data.length - 1].temps)

}
for (const [key, value] of Object.entries(dataTimeLine2)) {
    if (value.data) tab.push((value.data)[value.data.length - 1].temps)
}
max = Math.max(...tab)





dataTimeLine1 = [{
    "categorie": null,
    "data": [
        { temps: 0 },
    ]
}, {
    "categorie": null,
    "data": [
        { temps: max },
    ]
}].concat(dataTimeLine1)

dataTimeLine2 = [{
    "categorie": null,
    "data": [
        { temps: 0 },
    ]
}, {
    "categorie": null,
    "data": [
        { temps: max },
    ]
}].concat(dataTimeLine2)






function timeline_drawTimeLine() {
    var widthCard = ($("#timelineholder").width());
    var heightCard = 300;
    TimeKnots.draw("#timeline1", dataTimeLine1, { dateDimension: false, color: ["#2a315b", "#eead1c"], width: widthCard, height: heightCard, showLabels: true, labelFormat: "%Y" });
    TimeKnots.draw("#timeline2", dataTimeLine2, { dateDimension: false, color: ["#2a315b", "#eead1c"], width: widthCard, height: heightCard, showLabels: true, labelFormat: "%Y" });
};




function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }

async function timeline_progressBar() {
    console.log('prods')
    var S1 = 50;
    var S2 = 50;
    for (let index = 0; index < dataTimeLine1.length; index++) {

        var dataT1 = dataTimeLine1[index].data
        var dataT2 = dataTimeLine2[index].data
       console.log(dataTimeLine2[index].categorie)
        console.log('ttest'+((dataT1!= null) & (dataTimeLine1[index].categorie != null)) + ((dataT2 != null ) & (dataTimeLine2[index].categorie != null )))
        if ((dataT1 != null) & (dataTimeLine1[index].categorie != null)) {
            console.log(dataT1)

            S1 += dataT1[0].temps;
            console.log('S1 : '+S1);
        }
        if ((dataT2 != null ) & (dataTimeLine2[index].categorie != null )) {
            console.log(dataT2)

            S2 += dataT2[0].temps;
            console.log('S2 : '+S2);
        }
       
        console.log("somme"+S1+S2+(S1+S2))

        await sleep(1000);
        $("#bar1").css('width', S1 + '%').attr('aria-valuenow', S1).attr('aria-valuemax', (S1 + S2));
        $("#bar2").css('width', S2 + '%').attr('aria-valuenow', S2).attr('aria-valuemax', (S1 + S2));
        
    }
}
