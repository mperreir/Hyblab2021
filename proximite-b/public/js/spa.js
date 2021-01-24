const make_page_from_template = (page_name) => {
    const app = document.getElementById('app');
    fetch(`/proximite-b/templates/${page_name}.html`)
        .then(res => res.text())
        .then(text => {
            console.log(text);

            app.innerHTML = text;
        });
}

