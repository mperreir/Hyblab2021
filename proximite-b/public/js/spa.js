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
    console.log('store before:'+ JSON.stringify(_app_stores));

    if (page === "index")
        set_stores();
    add_store(page);

    if (data)
        store_in_current_page(data);

    make_page_from_template(page)
        .then(() => {
            if (page === 'timeline') {
                window.addEventListener("resize", timeline_progressbar_draw);
                timeline_progressbar_draw();
            }
            else if (page === 'criteres') {
                div_content = document.getElementById("critere_page");
                if(read_store('personas').chosen == "famille"){
                    div_content.style.backgroundImage = "url('/proximite-b/img/criteres/background_criteres_famille.svg')";
                    console.log("test");
                }else if(read_store('personas').chosen == "jeune"){
                    div_content.style.backgroundImage = "url('/proximite-b/img/criteres/background_criteres_etu.svg')";
                    console.log("test2");
                }else if(read_store('personas').chosen == "senior"){
                    console.log("test3");
                }
                $(function() {
                    $( "#sortable1, #sortable2, #sortable3" ).sortable({
                        connectWith: ".connectedSortable"
                    }).disableSelection();
                });

                $(function() {
                    $( "#sortable2" ).on( "sortreceive", function(event, ui) {
                        if ($("#sortable2 li").length > 5)
                            $(ui.sender).sortable('cancel');
                    });

                });

                $(function() {
                    $( "#sortable3" ).on( "sortreceive", function(event, ui) {
                        if($("#sortable3 li").length > 3)
                            $(ui.sender).sortable('cancel');
                    });
                });
            }
            else if (page === 'greeters'){
                greeter_background();
            }
            if (data && !callback && typeof data === 'function')
                data();
            else if (data && callback && typeof callback === 'function')
                callback();

            console.log('store after:'+ JSON.stringify(_app_stores));
        });
}
