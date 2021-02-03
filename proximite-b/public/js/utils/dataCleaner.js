function data_add_img(data, tab) {
    var interests = _app_stores['criteres']['interests'];
    var disinterests = _app_stores['criteres']['disinterests'];

    for (const [key, value] of Object.entries(data)) {
        var preference = 'interests'

        if(disinterests.includes(value.categorie)){preference = 'disinterests'};
        if (value.data.length >= 1) tab.push((value.data)[0].temps);
        if (value.categorie == "Arrêt de bus") value["img"] = "./img/timeline/icons/"+preference+"/bus.svg";
        if (value.categorie == "Boulangerie") value["img"] = "./img/timeline/icons/"+preference+"/boulangerie.svg";
        if (value.categorie == "Pharmacie") value["img"] = "./img/timeline/icons/"+preference+"/pharmacie.svg";
        if (value.categorie == "Ecole") value["img"] = "./img/timeline/icons/"+preference+"/ecole.svg";
        if (value.categorie == "Supermarché") value["img"] = "./img/timeline/icons/"+preference+"/supermarche.svg";
        if (value.categorie == "Médecin") value["img"] = "./img/timeline/icons/"+preference+"/medecin.svg";
        if (value.categorie == "Parc") value["img"] = "./img/timeline/icons/"+preference+"/parc.svg";
        if (value.categorie == "Lieu de culte") value["img"]= "./img/timeline/icons/"+preference+"/culte.svg";

    }
}

function add_min_max(data) {
    return [{
        "categorie": null,
        "img": "./img/timeline/House.svg",
        "data": [
            { temps: 0 },
        ]
    }, {
        "categorie": null,
        "data": [
            { temps: max },
        ]
    }].concat(data)
}

function clean_data(d1, d2) {
    var tab = []
    data_add_img(d1, tab);
    data_add_img(d2, tab);
    max = Math.max(...tab)
    return [add_min_max(d1), add_min_max(d2)]
}
