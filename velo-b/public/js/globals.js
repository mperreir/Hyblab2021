let zoneChoisie = null, vehiculeChoisi = null;

window.slideGraph = {};

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

function goToSlide(name) {
    name = name.match(/#?(.*)/)[1]; // Remove hashtag.

    mySlidr.slide(name);

    try {
        window.slideGraph[name].init();
    } catch {
        alert(`La page "${name}" n'est pas registered avec registerSlide() !`);
    }
}

window.onhashchange = () => {
    goToSlide(window.location.hash || "splash-screen");
};

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
