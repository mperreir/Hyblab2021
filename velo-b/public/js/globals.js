window.devMode = document.cookie.indexOf('dev=true') === 0;
window.onhashchange = () => window.devMode && goToSlide(window.location.hash || "splash-screen");

window.slideGraph = {};
window.zoneChoisie = null;
window.vehiculeChoisi = null;
window.currentSlide = null;

// Chargement du graphe des slides.
d3.json('data/slide-graph.json').then(slides => {
    for (const name in slides) {
        window.slideGraph[name] = {
            ...window.slideGraph[name],
            ...slides[name]
        };
    }
});

function registerSlide(name, init) {
    window.slideGraph[name] = { ...window.slideGraph[name], init };
}

function goToNextSlide(choice) {
    const current = window.slideGraph[window.currentSlide];
    if (!current) alert(`La slide ${window.currentSlide} (actuelle) n'existe pas !`);

    const next = current.next[choice];
    if (!current) alert(`Le choix ${choice} n'est pas disponible pour la slide ${window.currentSlide}`);

    goToSlide(next);
}

function goToSlide(name) {
    if (!name) alert(`Le choix ${name} n'est pas disponible pour la slide ${window.currentSlide}`);

    name = name.match(/#?(.*)/)[1]; // Remove hashtag.
    mySlidr.slide(name);
    d3.select("#debug-text").text(name);
    window.currentSlide = name;

    try {
        window.slideGraph[name].init();
    } catch {
        alert(`La slide "${name}" n'est pas registered avec registerSlide() !`);
    }
}

function overrideAnim(data) {
    anime.remove(data.targets);
    anime(data);
}

const initButtons = function () {
    d3.selectAll('.fancy-button, .image-button')
        .on('mouseover', function () {
            overrideAnim({
                targets: this,
                scale: 0.95
            });
        })
        .on('mouseout', function () {
            overrideAnim({
                targets: this,
                scale: 1
            });
        });
};

const fetchJsonData = function (addr, callback) {
    fetch(addr)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        callback(data);
                    })
                    .catch(e => {
                        console.error(e);
                    });
            } else {
                console.error(response + " is not valid");
            }
        })
        .catch(e => {
            console.error(e);
        });
};

registerSlide("slides", () => {
    const slideNames = Object.keys(window.slideGraph);
    const list = document.getElementById("slide-list");

    list.innerHTML = '';

    slideNames.forEach(name => {
        const item = document.createElement("li");
        const link = document.createElement("a");

        link.href = `#${name}`;
        link.text = name;

        item.append(link);
        list.append(item);
    });
});
