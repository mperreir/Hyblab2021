
// console.log(_app_stores)


var stor = {
    "all": { "current_page": "timeline" },
    "personas": { "chosen": "jeune" },
    "greeters": {},
    "adresses": {

        "adresse1": { "longitude": "-1.532116", "latitude": "47.238194" },
        "adresse2": { "longitude": "-1.532116", "latitude": "47.238194" }
    },
    "criteres": {
        "interests": ["bus", "boulangerie", "medecin"],
        "disinterests": ["culte", "parc"]
    },
    "timeline": {}
}



fetch(`api/${stor.adresses.adresse1.longitude}/${stor.adresses.adresse1.latitude}`
    ,
    {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(stor),
    }
)
    .then((response) => {
        response.json().then(
            function (data) {
                console.log("test");
                console.log(data);
            }
        )
    });


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
        "data": []
    },
    {
        "categorie": "Ecole",
        "data": []
    },
    {
        "categorie": "Supermarche",
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
        "categorie": "Supermarche",
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



[dataTimeLine1, dataTimeLine2] = clean_data(dataTimeLine1, dataTimeLine2)



function timeline_progressbar_draw() {
    var widthCard = ($("#timelineholder").width());
    var heightCard = 300;
    TimeKnots.draw("#timeline1", dataTimeLine1, { color: ["#2a315b", "#eead1c"], width: widthCard, height: heightCard, showLabels: true });
    TimeKnots.draw("#timeline2", dataTimeLine2, { color: ["#2a315b", "#eead1c"], width: widthCard, height: heightCard, showLabels: true });
    ProgressBar.draw("#progressDiv");
};