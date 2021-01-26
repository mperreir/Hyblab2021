






var dataTimeLine1 = [
    {
        "categorie": "Boulangerie",
        "data": [
            { temps: 1, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
            { temps: 3, nom: "Boulang2", adresse: "12 Rue XXXX XX XX" },
            { temps: 5, nom: "Boulang3", adresse: "4 Rue XXX XX XXX" },
        ]
    },
    {
        "categorie": "Pharmacie",
        "data": null
    },
    {
        "categorie": "Ecole",
        "data": null
    },
    {
        "categorie": "Supermache",
        "data": [
            { temps: 6, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
            { temps: 9, nom: "Boulang3", adresse: "4 Rue XXX XX XXX" },
        ]
    },
    {
        "categorie": "Docteur",
        "data": [
            { temps: 5, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
        ]
    },
    {
        "categorie": "Bus",
        "data": [
            { temps: 7, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
        ]
    },
    {
        "categorie": "Parc",
        "data": [
            { temps: 9, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
        ]
    }
];


var dataTimeLine2 = [
    {
        "categorie": "Boulangerie",
        "data": [
            { temps: 1, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
            { temps: 3, nom: "Boulang2", adresse: "12 Rue XXXX XX XX" },
            { temps: 5, nom: "Boulang3", adresse: "4 Rue XXX XX XXX" },
        ]
    },
    {
        "categorie": "Pharmacie",
        "data": [
            { temps: 8, nom: "Boulang2", adresse: "12 Rue XXXX XX XX" },
        ]
    },
    {
        "categorie": "Ecole",
        "data": [
            { temps: 3, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
            { temps: 5, nom: "Boulang3", adresse: "4 Rue XXX XX XXX" },
        ]
    },
    {
        "categorie": "Supermache",
        "data": [
            { temps: 5, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
            { temps: 9, nom: "Boulang3", adresse: "4 Rue XXX XX XXX" },
        ]
    },
    {
        "categorie": "Docteur",
        "data": [
            { temps: 14, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
        ]
    },
    {
        "categorie": "Bus",
        "data": [
            { temps: 11, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
        ]
    },
    {
        "categorie": "Parc",
        "data": [
            { temps: 11, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
        ]
    }
];



[dataTimeLine1,dataTimeLine2] = clean_data(dataTimeLine1,dataTimeLine2)



function timeline_draw() {
    var widthCard = ($("#timelineholder").width());
    var heightCard = 300;
    TimeKnots.draw("#timeline1", dataTimeLine1, { color: ["#2a315b", "#eead1c"], width: widthCard, height: heightCard, showLabels: true });
    TimeKnots.draw("#timeline2", dataTimeLine2, { color: ["#2a315b", "#eead1c"], width: widthCard, height: heightCard, showLabels: true });
    timeline_progressBar();
};



function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

/**
 *  "criteres":{
 *  "interests":["supermarche","bus","boulangerie","pharmacie","parc"],
 *  "disinterests":["culte","ecole"]}
 *  }
 * @param {*} d 
 */
function evaluate(d) {
    // console.log(stores.criteres)
    
    return d.temps;
}


async function timeline_progressBar() {
    var S1 = 1;
    var S2 = 1;
    var Somme = S1 + S2;

    $("#progressDiv").html("")
    var b1 =$('<div>') ;
    b1.attr('id', 'bar1')
        .attr('class', 'progress-bar bar-T1')
        .attr('role', 'progressbar')
        .css("width", '50%')
        .attr('aria-valuemin', '0')
        .attr('aria-valuemax', '100')
        .text("adresse1");

    var b2 = $('<div>');
    b2.attr('id', 'bar2')
        .attr('class', 'progress-bar bar-T2')
        .attr('role', 'progressbar')
        .css("width", '50%')
        .attr('aria-valuemin', '0')
        .attr('aria-valuemax', '100')
        .text("adresse2");;

    $("#progressDiv").append(b1);
    $("#progressDiv").append(b2);
    b1.css('width', (S1 / (Somme)) * 100 + '%').attr('aria-valuenow', S1).attr('aria-valuemax', Somme);
    b2.css('width', (S2 / (Somme)) * 100 + '%').attr('aria-valuenow', S2).attr('aria-valuemax', Somme);
    for (let index = 0; index < dataTimeLine1.length; index++) {
        var dataT1 = dataTimeLine1[index].data
        var dataT2 = dataTimeLine2[index].data
        if ((dataT1 != null) & (dataTimeLine1[index].categorie != null)) {
            S1 += evaluate(dataT1[0]);
        }
        if ((dataT2 != null) & (dataTimeLine2[index].categorie != null)) {
            S2 += evaluate(dataT2[0]);
        }
        Somme = S1 + S2;
        if (dataTimeLine1[index].categorie != null) {
            await sleep(1000);
        }
        b1.css('width', (S1 / (Somme)) * 100 + '%').attr('aria-valuenow', S1).attr('aria-valuemax', Somme);
        b2.css('width', (S2 / (Somme)) * 100 + '%').attr('aria-valuenow', S2).attr('aria-valuemax', Somme);
    }
}
