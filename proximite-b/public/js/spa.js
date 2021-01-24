let stores = {
    "all": {
        "current_page": null,
    },
};

const add_store = (name) => {
    if (!stores.hasOwnProperty(name))
        stores[name] = {}
};

const store_in_current_page = (data) => {
    stores[stores["all"]["current_page"]] = data;
};

const make_page_from_template = (page_name) => {
    const app = document.getElementById('app');
    fetch(`/proximite-b/templates/${page_name}.html`)
        .then(res => res.text())
        .then(text => {
            app.innerHTML = text;
            stores["all"]["current_page"] = page_name;
        });
}

const goto_home = () => {
    stores = {};
    make_page_from_template("index");
};
const goto_adresses = (persona) => {
    add_store("adresses");
    store_in_current_page({"chosen": persona});
    make_page_from_template("adresses");
};
const goto_personas = () => {
    add_store("personas");
    make_page_from_template("personas");
};
const goto_criteres = (positions) => {
    add_store("criteres");
    store_in_current_page({"positions": positions});
    make_page_from_template("criteres");
};
const goto_timeline = () => {
    add_store("timeline");
    make_page_from_template("timeline");
};
const goto_conclu = () => {
    add_store("conclu");
    make_page_from_template("conclu");
};
