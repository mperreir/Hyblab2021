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

const read_store = (name) => _app_store[name];

const make_page_from_template = (page_name) => {
    const app = document.getElementById('app');
    return fetch(`/proximite-b/templates/${page_name}.html`)
        .then(res => res.text())
        .then(text => {
            app.innerHTML = text;
            _app_stores["all"]["current_page"] = page_name;
        });
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
            if(page =='criteres'){
                $( function() {
                    $( "#sortable1, #sortable2, #sortable3" ).sortable({
                        connectWith: ".connectedSortable"
                    }).disableSelection();
                } );

                $( function() {
                    $( "#sortable2" ).on( "sortreceive", function(event, ui) {
                        if($("#sortable2 li").length > 5){
                            $(ui.sender).sortable('cancel');
                        }
                    });

                });

                $( function() {
                    $( "#sortable3" ).on( "sortreceive", function(event, ui) {
                        if($("#sortable3 li").length > 3){
                            $(ui.sender).sortable('cancel');
                        }
                    });
                });
            }

            if (data && !callback && typeof data === 'function')
                data();
            else if (data && callback && typeof callback === 'function')
                callback();

                console.log('store after:'+ JSON.stringify(_app_stores));
        });
}
