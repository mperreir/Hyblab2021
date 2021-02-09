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
    css_dyn_loader(`css/${page_name}.css`);

    const app = document.getElementById('app');
    return fetch(`templates/${page_name}.html`)
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

function audioVolumeFadeOut(q) {
    if (q.volume) {
        var InT = 0.4;
        var setVolume = 0;  // Target volume level for old song 
        var speed = 0.020;  // Rate of volume decrease
        q.volume = InT;
        var fAudio = setInterval(function () {
            InT -= speed;
            q.volume = InT.toFixed(1);
            if (InT.toFixed(1) <= setVolume) {
                clearInterval(fAudio);
            };
        }, 50);
    };
};

const go_to = (page, data, callback) => {
    // console.log('store before:' + JSON.stringify(_app_stores));

    if (page === "index")
        set_stores();
    add_store(page);

    if (data)
        store_in_current_page(data);

    make_page_from_template(page)
        .then(() => {
            if (page === 'animation') {
                const son_gare = document.getElementById("son-gare");
                son_gare.volume = 0.2;
                son_gare.play();
            }

            if (page === 'adresses') {
                const son_gare = document.getElementById("son-gare");
                audioVolumeFadeOut(son_gare);
            }

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
            }
            else if (page === 'criteres') {
                criteres_background();


                // Fonction pour attribuer le plugin de drag and drop avec possibilité de tri
                $(function () {
                    $("#sortable1, #sortable2, #sortable3").sortable({
                        connectWith: ".connectedSortable",
                        cursor: "grabbing"
                    }).disableSelection();
                });

                // Verification du nombre de critères souhaité pour ne pas dépasser 5
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

                //Fonctions gerer la numérotation des critères
                $("#sortable2").sortable({
                    update: function (event, ui) {
                        var sort = document.getElementById('sortable2');
                        for (let child of sort.children) {
                            var number = child.firstChild;
                            number.innerHTML = $(child).index() + 1 + ". ";
                        }
                    }
                });

                $("#sortable3").sortable({
                    update: function (event, ui) {
                        var sort = document.getElementById('sortable3');
                        for (let child of sort.children) {
                            var number = child.firstChild;
                            number.innerHTML = $(child).index() + 1 + ". ";
                        }
                    }
                });

                $("#sortable1").sortable({
                    update: function (event, ui) {
                        var sort = document.getElementById('sortable1');
                        for (let child of sort.children) {
                            var number = child.firstChild;
                            number.innerHTML = "";
                        }
                    }
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

            // console.log('store after:' + JSON.stringify(_app_stores));
        });
}
