/*            stores             */

var _app_stores = {};

const set_stores = () => {
    _app_stores = {
        "all": {
            "current_page": null,
        },
    };
}

set_stores();

const add_store = (name) => {
    if (!_app_stores.hasOwnProperty(name))
        _app_stores[name] = {}
};

const store_in_current_page = (data) => {
    _app_stores[_app_stores["all"]["current_page"]] = data;
};

const read_store = (name) => _app_stores[name];

/*          fin des stores               */



const make_page_from_template = (page_name) => {
    // load the correct css
    css_dyn_loader(`/proximite-b/css/${page_name}.css`);

    const app = document.getElementById('app');
    return fetch(`/proximite-b/templates/${page_name}.html`)
        .then(res => res.text())
        .then(text => {
            app.innerHTML = text;
            _app_stores["all"]["current_page"] = page_name;
        });
}

const css_dyn_loader = (filename) => {
    let head = document.head;
    let style = null;

    const links = head.getElementsByTagName('link');
    let ll = [];
    for (const link of links)
        ll.push(link);

    if (ll.filter(e => e.href.startsWith('css/')).length !== 2)
        style = document.createElement('link');
    else {
        style = head.getElementsByTagName('link');
        style = style[style.length - 1];
    }

    style.type = 'text/css';
    style.rel = "stylesheet";
    style.href = filename;

    head.appendChild(style);
}

const go_to = (page, data, callback) => {
    console.log('store before:' + JSON.stringify(_app_stores));

    if (page === "index")
        set_stores();
    add_store(page);

    if (data)
        store_in_current_page(data);

    make_page_from_template(page)
        .then(() => {
            if (page === 'timeline') {
                //formatage des criteres pour permettre a l'api de les traiter
                _app_stores['criteres']['interests'] = _app_stores['criteres']['interests'].map(x => reformatCriteres(x));
                _app_stores['criteres']['disinterests'] = _app_stores['criteres']['disinterests'].map(x => reformatCriteres(x));
                var a1 = _app_stores.adresses.adresse1;
                var a2 = _app_stores.adresses.adresse2;
                //initialisation du stockage de la timeline
                _app_stores["timeline"]["done"] = 0;
                _app_stores["timeline"]['data'] = {}
                getData("adresse1", a1);
                getData("adresse2", a2);

                
                //A SUPPRIMER : HARDCODAGE DUNE REPONSE API pour eviter de perdre des credits api
                // _app_stores = { "all": { "current_page": "timeline" }, "personas": { "chosen": "famille" }, "animation": {}, "greeters": {}, "adresses": { "adresse1": { "longitude": "-1.532116", "latitude": "47.238194", "label": "58 Boulevard Jules Verne 44300 Nantes" }, "adresse2": { "longitude": "-1.532116", "latitude": "47.238194", "label": "58 Boulevard Jules Verne 44300 Nantes" } }, "criteres": { "interests": ["Ecole", "Pharmacie", "Supermarché", "Boulangerie", "Médecin"], "disinterests": ["Lieu de culte", "Arrêt de bus", "Parc"] }, "timeline": { "done": 2, "data": { "adresse1": [{ "categorie": null, "data": [{ "temps": 0 }] }, { "categorie": null, "data": [{ "temps": 7 }] }, { "categorie": "Ecole", "data": [{ "temps": 7, "nom": "Section d'enseignement général et professionnel adapté du Collège Rutigliano", "adresse": "16 Rue de Préaulx 44300 Nantes" }, { "temps": 11, "nom": "Maternelle Urbain Le Verrier", "adresse": "11 Rue Urbain le Verrier 44300 Nantes" }, { "temps": 11, "nom": "Elementaire Urbain Le Verrier", "adresse": "18 Rue de Valenciennes 44300 Nantes" }, { "temps": 11, "nom": "Multi-Accueil Bottière", "adresse": "2 Rue Gabriel Lippmann 44300 Nantes" }, { "temps": 12, "nom": "École secondaire professionnelle privée Anjorrant", "adresse": "80 Rue Général Buat 44000 Nantes" }, { "temps": 12, "nom": "Multiaccueil Petite Enfance La Pilotière", "adresse": "31 Rue des Platanes 44300 Nantes" }, { "temps": 12, "nom": "La Perdriole", "adresse": "38 Rue des Platanes 44300 Nantes" }, { "temps": 14, "nom": "École Notre-Dame des Batignolles", "adresse": "184 Boulevard Jules Verne 44300 Nantes" }, { "temps": 15, "nom": "Crèche Associative La Maison de Nanou", "adresse": "75 Rue Général Buat 44000 Nantes" }], "img": "./img/timeline/icons/interests/ecole.svg" }, { "categorie": "Pharmacie", "data": [{ "temps": 4, "nom": "Pharmacie Hauray", "adresse": "88 Boulevard Jules Verne 44300 Nantes" }, { "temps": 6, "nom": "Pharmacie du rond point de Paris", "adresse": "2 Boulevard Jules Verne 44300 Nantes" }, { "temps": 9, "nom": "Pharmacie Petitgas", "adresse": "12 Rue Louis Guiotton 44300 Nantes" }, { "temps": 9, "nom": "Pharmacie de Montbazon", "adresse": "58 Boulevard des Belges 44300 Nantes" }, { "temps": 9, "nom": "Pharmacie", "adresse": "173 Route de Saint Joseph 44300 Nantes" }, { "temps": 12, "nom": "Pharmacie de la Bottière", "adresse": "63 Rue de la Bottière 44300 Nantes" }, { "temps": 13, "nom": "Pharmacie des Chalâtres", "adresse": "53 Rue des Chalâtres 44000 Nantes" }, { "temps": 14, "nom": "Pharmacie du Ranzay", "adresse": "194 Route de Saint Joseph 44300 Nantes" }, { "temps": 15, "nom": "Pharmacie Saint-Donatien", "adresse": "118 bis Rue Général Buat 44000 Nantes" }], "img": "./img/timeline/icons/interests/pharmacie.svg" }, { "categorie": "Supermarché", "data": [{ "temps": 6, "nom": "Carrefour Market", "adresse": "12 Boulevard Jules Verne 44300 Nantes" }, { "temps": 9, "nom": "Alimentation", "adresse": "163 Boulevard Jules Verne 44300 Nantes" }, { "temps": 15, "nom": "Le Verger de Saint-Do", "adresse": "130 Rue Général Buat 44000 Nantes" }], "img": "./img/timeline/icons/interests/supermarche.svg" }, { "categorie": "Boulangerie", "data": [{ "temps": 3, "nom": "Le Croquembouche", "adresse": "78 Boulevard Jules Verne 44300 Nantes" }, { "temps": 6, "nom": "Confiture de lait", "adresse": "135 Boulevard Jules Verne 44300 Nantes" }, { "temps": 7, "nom": "Boulangerie", "adresse": "90 bis Rue du Croissant 44300 Nantes" }, { "temps": 7, "nom": "Marie et Thierry Charrier", "adresse": "2 Rue Général Buat 44000 Nantes" }, { "temps": 8, "nom": "À la boul' nantaise", "adresse": "7 bis Rue Général Buat 44000 Nantes" }, { "temps": 11, "nom": "Boulangerie de l'Éraudière", "adresse": "4 Avenue Abel Gance 44300 Nantes" }, { "temps": 12, "nom": "Mbc", "adresse": "71 Rue de la Bottière 44300 Nantes" }, { "temps": 13, "nom": "Aux fournées de la Tortière", "adresse": "147 Boulevard des Belges 44300 Nantes" }, { "temps": 13, "nom": "Aux Délices d'Ambre", "adresse": "3 Place Victor Richard 44000 Nantes" }, { "temps": 15, "nom": "Boulangerie Catherine", "adresse": "122 Rue Général Buat 44000 Nantes" }], "img": "./img/timeline/icons/interests/boulangerie.svg" }, { "categorie": "Médecin", "data": [{ "temps": 2, "nom": "Allergologue Laurent-Charles Antoine", "adresse": "46 Boulevard Jules Verne 44300 Nantes" }, { "temps": 3, "nom": "Cabinet Kinésithérapeutes", "adresse": "117 Boulevard Jules Verne 44300 Nantes" }, { "temps": 4, "nom": "Centre radiologique de l'Éraudière", "adresse": "17 Rue des Marsauderies 44300 Nantes" }, { "temps": 5, "nom": "Cabinet médical", "adresse": "134 Rue du Croissant 44300 Nantes" }, { "temps": 6, "nom": "Cabinet Médical", "adresse": "134 Rue du Croissant 44300 Nantes" }, { "temps": 12, "nom": "Médecin", "adresse": "63 Rue de la Bottière 44300 Nantes" }, { "temps": 12, "nom": "Cabinet médical de la Tortière", "adresse": "108 Boulevard des Belges 44300 Nantes" }], "img": "./img/timeline/icons/interests/medecin.svg" }, { "categorie": "Lieu de culte", "data": [], "img": "./img/timeline/icons/disinterests/culte.svg" }, { "categorie": "Parc", "data": [{ "temps": 6, "nom": "Parc du Plessis Tison", "adresse": "18 Rue de Racapé 44300 Nantes" }, { "temps": 11, "nom": "Square Pilotière", "adresse": "22 Boulevard de la Pilotière 44300 Nantes" }, { "temps": 11, "nom": "Square Augustin Fresnel", "adresse": "23 Rue Augustin Fresnel 44300 Nantes" }, { "temps": 13, "nom": "Espace de jeux de Belle Ile", "adresse": "21 Rue de Coetquelfen 44300 Nantes" }], "img": "./img/timeline/icons/disinterests/parc.svg" }, { "categorie": "Arrêt de bus", "data": [{ "temps": 2, "nom": "Plessis Tison", "adresse": "42 Boulevard Jules Verne 44300 Nantes" }, { "temps": 3, "nom": "Croissant", "adresse": "86 Boulevard Jules Verne 44300 Nantes" }, { "temps": 6, "nom": "Guindré", "adresse": "98 Route de Saint Joseph 44300 Nantes" }, { "temps": 7, "nom": "Éraudière", "adresse": "2 Rue de la Cornouaille 44300 Nantes" }, { "temps": 7, "nom": "Port Boyer", "adresse": "76 Rue du Port Boyer 44300 Nantes" }, { "temps": 7, "nom": "Chocolaterie", "adresse": "128 Boulevard Jules Verne 44300 Nantes" }, { "temps": 7, "nom": "Marrière", "adresse": "5 Rue de la Bottière 44300 Nantes" }, { "temps": 7, "nom": "Rond-Point de Paris", "adresse": "6 Boulevard des Belges 44300 Nantes" }, { "temps": 8, "nom": "Keren", "adresse": "6 Rue de Baccarat 44300 Nantes" }, { "temps": 8, "nom": "Ménétrier", "adresse": "2 Rue Augustin Fresnel 44300 Nantes" }], "img": "./img/timeline/icons/disinterests/bus.svg" }], "adresse2": [{ "categorie": null, "data": [{ "temps": 0 }] }, { "categorie": null, "data": [{ "temps": 7 }] }, { "categorie": "Ecole", "data": [{ "temps": 7, "nom": "Section d'enseignement général et professionnel adapté du Collège Rutigliano", "adresse": "16 Rue de Préaulx 44300 Nantes" }, { "temps": 11, "nom": "Maternelle Urbain Le Verrier", "adresse": "11 Rue Urbain le Verrier 44300 Nantes" }, { "temps": 11, "nom": "Elementaire Urbain Le Verrier", "adresse": "18 Rue de Valenciennes 44300 Nantes" }, { "temps": 11, "nom": "Multi-Accueil Bottière", "adresse": "2 Rue Gabriel Lippmann 44300 Nantes" }, { "temps": 12, "nom": "École secondaire professionnelle privée Anjorrant", "adresse": "80 Rue Général Buat 44000 Nantes" }, { "temps": 12, "nom": "Multiaccueil Petite Enfance La Pilotière", "adresse": "31 Rue des Platanes 44300 Nantes" }, { "temps": 12, "nom": "La Perdriole", "adresse": "38 Rue des Platanes 44300 Nantes" }, { "temps": 14, "nom": "École Notre-Dame des Batignolles", "adresse": "184 Boulevard Jules Verne 44300 Nantes" }, { "temps": 15, "nom": "Crèche Associative La Maison de Nanou", "adresse": "75 Rue Général Buat 44000 Nantes" }], "img": "./img/timeline/icons/interests/ecole.svg" }, { "categorie": "Pharmacie", "data": [{ "temps": 4, "nom": "Pharmacie Hauray", "adresse": "88 Boulevard Jules Verne 44300 Nantes" }, { "temps": 6, "nom": "Pharmacie du rond point de Paris", "adresse": "2 Boulevard Jules Verne 44300 Nantes" }, { "temps": 9, "nom": "Pharmacie Petitgas", "adresse": "12 Rue Louis Guiotton 44300 Nantes" }, { "temps": 9, "nom": "Pharmacie de Montbazon", "adresse": "58 Boulevard des Belges 44300 Nantes" }, { "temps": 9, "nom": "Pharmacie", "adresse": "173 Route de Saint Joseph 44300 Nantes" }, { "temps": 12, "nom": "Pharmacie de la Bottière", "adresse": "63 Rue de la Bottière 44300 Nantes" }, { "temps": 13, "nom": "Pharmacie des Chalâtres", "adresse": "53 Rue des Chalâtres 44000 Nantes" }, { "temps": 14, "nom": "Pharmacie du Ranzay", "adresse": "194 Route de Saint Joseph 44300 Nantes" }, { "temps": 15, "nom": "Pharmacie Saint-Donatien", "adresse": "118 bis Rue Général Buat 44000 Nantes" }], "img": "./img/timeline/icons/interests/pharmacie.svg" }, { "categorie": "Supermarché", "data": [{ "temps": 6, "nom": "Carrefour Market", "adresse": "12 Boulevard Jules Verne 44300 Nantes" }, { "temps": 9, "nom": "Alimentation", "adresse": "163 Boulevard Jules Verne 44300 Nantes" }, { "temps": 15, "nom": "Le Verger de Saint-Do", "adresse": "130 Rue Général Buat 44000 Nantes" }], "img": "./img/timeline/icons/interests/supermarche.svg" }, { "categorie": "Boulangerie", "data": [{ "temps": 3, "nom": "Le Croquembouche", "adresse": "78 Boulevard Jules Verne 44300 Nantes" }, { "temps": 6, "nom": "Confiture de lait", "adresse": "135 Boulevard Jules Verne 44300 Nantes" }, { "temps": 7, "nom": "Boulangerie", "adresse": "90 bis Rue du Croissant 44300 Nantes" }, { "temps": 7, "nom": "Marie et Thierry Charrier", "adresse": "2 Rue Général Buat 44000 Nantes" }, { "temps": 8, "nom": "À la boul' nantaise", "adresse": "7 bis Rue Général Buat 44000 Nantes" }, { "temps": 11, "nom": "Boulangerie de l'Éraudière", "adresse": "4 Avenue Abel Gance 44300 Nantes" }, { "temps": 12, "nom": "Mbc", "adresse": "71 Rue de la Bottière 44300 Nantes" }, { "temps": 13, "nom": "Aux fournées de la Tortière", "adresse": "147 Boulevard des Belges 44300 Nantes" }, { "temps": 13, "nom": "Aux Délices d'Ambre", "adresse": "3 Place Victor Richard 44000 Nantes" }, { "temps": 15, "nom": "Boulangerie Catherine", "adresse": "122 Rue Général Buat 44000 Nantes" }], "img": "./img/timeline/icons/interests/boulangerie.svg" }, { "categorie": "Médecin", "data": [{ "temps": 2, "nom": "Allergologue Laurent-Charles Antoine", "adresse": "46 Boulevard Jules Verne 44300 Nantes" }, { "temps": 3, "nom": "Cabinet Kinésithérapeutes", "adresse": "117 Boulevard Jules Verne 44300 Nantes" }, { "temps": 4, "nom": "Centre radiologique de l'Éraudière", "adresse": "17 Rue des Marsauderies 44300 Nantes" }, { "temps": 5, "nom": "Cabinet médical", "adresse": "134 Rue du Croissant 44300 Nantes" }, { "temps": 6, "nom": "Cabinet Médical", "adresse": "134 Rue du Croissant 44300 Nantes" }, { "temps": 12, "nom": "Médecin", "adresse": "63 Rue de la Bottière 44300 Nantes" }, { "temps": 12, "nom": "Cabinet médical de la Tortière", "adresse": "108 Boulevard des Belges 44300 Nantes" }], "img": "./img/timeline/icons/interests/medecin.svg" }, { "categorie": "Lieu de culte", "data": [], "img": "./img/timeline/icons/disinterests/culte.svg" }, { "categorie": "Parc", "data": [{ "temps": 6, "nom": "Parc du Plessis Tison", "adresse": "18 Rue de Racapé 44300 Nantes" }, { "temps": 11, "nom": "Square Pilotière", "adresse": "22 Boulevard de la Pilotière 44300 Nantes" }, { "temps": 11, "nom": "Square Augustin Fresnel", "adresse": "23 Rue Augustin Fresnel 44300 Nantes" }, { "temps": 13, "nom": "Espace de jeux de Belle Ile", "adresse": "21 Rue de Coetquelfen 44300 Nantes" }], "img": "./img/timeline/icons/disinterests/parc.svg" }, { "categorie": "Arrêt de bus", "data": [{ "temps": 2, "nom": "Plessis Tison", "adresse": "42 Boulevard Jules Verne 44300 Nantes" }, { "temps": 3, "nom": "Croissant", "adresse": "86 Boulevard Jules Verne 44300 Nantes" }, { "temps": 6, "nom": "Guindré", "adresse": "98 Route de Saint Joseph 44300 Nantes" }, { "temps": 7, "nom": "Éraudière", "adresse": "2 Rue de la Cornouaille 44300 Nantes" }, { "temps": 7, "nom": "Port Boyer", "adresse": "76 Rue du Port Boyer 44300 Nantes" }, { "temps": 7, "nom": "Chocolaterie", "adresse": "128 Boulevard Jules Verne 44300 Nantes" }, { "temps": 7, "nom": "Marrière", "adresse": "5 Rue de la Bottière 44300 Nantes" }, { "temps": 7, "nom": "Rond-Point de Paris", "adresse": "6 Boulevard des Belges 44300 Nantes" }, { "temps": 8, "nom": "Keren", "adresse": "6 Rue de Baccarat 44300 Nantes" }, { "temps": 8, "nom": "Ménétrier", "adresse": "2 Rue Augustin Fresnel 44300 Nantes" }], "img": "./img/timeline/icons/disinterests/bus.svg" }] } } }
                // $('#waitingSpinner').remove();
                // $('#compEnCours').remove();
                // $('#progressDiv').css('visibility', 'visible');
                // $('#goToConclusion').css('visibility', 'visible');
                // $('#titleTimeline').css('visibility', 'visible');
                // timeline_progressbar_draw();
                /////////
                // fin du bloc a commenter pour tests avec hardcodage
                /////////

            }
            else if (page === 'criteres') {
                criteres_background();

                $(function () {
                    $("#sortable1, #sortable2, #sortable3").sortable({
                        connectWith: ".connectedSortable"
                    }).disableSelection();
                });

                $(function () {
                    $("#sortable2").on("sortreceive", function (event, ui) {
                        if ($("#sortable2 li").length > 5)
                            $(ui.sender).sortable('cancel');
                    });

                });

                $(function () {
                    $("#sortable3").on("sortreceive", function (event, ui) {
                        if ($("#sortable3 li").length > 3)
                            $(ui.sender).sortable('cancel');
                    });
                });
            }
            else if (page === 'animation') {
                lockScroll();
                animation_background();
                setTimeout(function () { go_to('greeters'); }, 5000);
            }
            else if (page === 'greeters') {
                greeter_background();
            }
            if (data && !callback && typeof data === 'function')
                data();
            else if (data && callback && typeof callback === 'function')
                callback();

            console.log('store after:' + JSON.stringify(_app_stores));
        });
}
