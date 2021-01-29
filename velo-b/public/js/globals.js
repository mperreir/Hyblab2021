window.slides = {};

function registerSlide(name, init) {
    window.slides[name] = init;
}

function goToSlide(name) {
    name = name.match(/#?(.*)/)[1]; // Remove hashtag.

    mySlidr.slide(name);

    try {
        window.slides[name]();
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
    d3.selectAll('.fancy-button').on('mouseover', function () {
        overrideAnim({
            targets: this,
            scale: 0.95
        });
    });

    d3.selectAll('.fancy-button').on('mouseout', function () {
        overrideAnim({
            targets: this,
            scale: 1
        });
    });
};

registerSlide("slides", () => {
    const slideNames = Object.keys(window.slides);
    const list = document.getElementById("slide-list");

    slideNames.forEach(name => {
        const item = document.createElement("li");
        const link = document.createElement("a");

        link.href = `#${name}`;
        link.text = name;

        item.append(link);
        list.append(item);
    });
});
