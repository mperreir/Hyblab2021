window.devMode = document.cookie.indexOf('dev=true') > -1;
window.onhashchange = () => window.devMode && goToSlide(window.location.hash || "splash-screen");

window.results = {
    quartier: null,
    transports: [],
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

let statistics = null;

// Chargement des statistiques.
d3.json('data/statistics.json').then(data => statistics = data);

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
    const current = window.slideGraph[name];

    if (choice === 'ok' && current.relevant) {
        window.results.relevant = unique(window.results.relevant, current.relevant);
    }

    if (name === 'page-carte') {
        window.results.quartier = choice;
    }

    if ((choice === 'ok' || choice === 'oui') && current.transport) {
        window.results.transports = unique(window.results.transports, [current.transport]);
    }

    if (name === 'page-arrivee') {
        window.results.stats = {
            "prix": constrain(average(window.results.transports.map(name => statistics[name]["prix"])), statistics.min["prix"], statistics.max["prix"]),
            "vitesse": constrain(average(window.results.transports.map(name => statistics[name]["vitesse"])), statistics.min["vitesse"], statistics.max["vitesse"]),
            "émission de CO2": constrain(average(window.results.transports.map(name => statistics[name]["émission de CO2"])), statistics.min["émission de CO2"], statistics.max["émission de CO2"]),
            "calories brûlés": constrain(average(window.results.transports.map(name => statistics[name]["calories brûlés"])), statistics.min["calories brûlés"], statistics.max["calories brûlés"]),
        };
    }
}

function average(arr) {
    return arr.reduce((a, b) => a + b) / arr.length;
}
function constrain(value, min, max) {
    return (value - min) / (max - min)
}

function unique(...arr) {
    return [...new Set([].concat(...arr))];
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
