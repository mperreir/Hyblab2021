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
