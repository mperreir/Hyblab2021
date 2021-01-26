function data_add_img(data,tab){
    for (const [key, value] of Object.entries(data)) {
        console.log(value)
        if (value.data) tab.push((value.data)[value.data.length - 1].temps);
        if (value.categorie == "Bus") value["img"] = "./img/timeline/bus.svg";
        if (value.categorie == "Boulangerie") value["img"] = "./img/timeline/boulangerie.svg" ;
        if (value.categorie == "Pharmacie") value["img"] = "./img/timeline/pharmacie.svg";
        if (value.categorie == "Ecole") value["img"] = "./img/timeline/ecole.svg";
        if (value.categorie == "Supermarche") value["img"] = "./img/timeline/market.svg";
        if (value.categorie == "Docteur") value["img"] = "./img/timeline/doctor.svg";
        if (value.categorie == "Parc") value["img"] = "./img/timeline/park.svg";
    }
}

function add_min_max(data){
    return [{
        "categorie": null,
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

function clean_data(d1,d2){
    var tab = []
    data_add_img(d1,tab);
    data_add_img(d2,tab);
    max = Math.max(...tab)
    return [add_min_max(d1), add_min_max(d2)]
}
