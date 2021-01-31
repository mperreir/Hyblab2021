window.devMode = document.cookie.indexOf('dev=true') > -1;
window.onhashchange = () => window.devMode && goToSlide(window.location.hash || "splash-screen");

window.results = {
    quartier: null,
    transport: null,
    relevant: []
};

window.slideGraph = {};
window.currentSlide = null;
window.lastSlide = null;

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

    const links = current[window.lastSlide] || current.next;
    const next = links[choice];
    if (!current) alert(`Le choix ${choice} n'est pas disponible pour la slide ${window.currentSlide}`);

    updateResults(window.currentSlide, choice);
    goToSlide(next);
}

function goToSlide(name) {
    if (!name) alert(`Le choix ${name} n'est pas disponible pour la slide ${window.currentSlide}`);

    name = name.match(/#?(.*)/)[1]; // Remove hashtag.
    mySlidr.slide(name);
    d3.select("#debug-text").text(name);

    window.lastSlide = window.currentSlide;
    window.currentSlide = name;

    try {
        window.slideGraph[name].init();
    } catch {
        alert(`La slide "${name}" n'est pas registered avec registerSlide() !`);
    }
}

function updateResults(name, choice) {
    if (choice === 'ok') {
        const relevant = window.slideGraph[name].relevant;
        if (relevant) {
            window.results.relevant = [...new Set([...window.results.relevant, ...relevant])];
        }
    }

    if (name === 'page-carte') {
        window.results.quartier = choice;
    }

    const transport = name.match(/choix-transport-(\w+)/);
    if (transport) {
        window.results.transport = transport[1];
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
