registerSlide("question-voiture-velo", function () {
    button( '#ic-oui-voit', 'oui');
    button( '#ic-non-voit', 'non');
});

registerSlide("question-velo-autres-transports", function () {
    button( '#ic-oui-velo', 'oui');
    button( '#ic-non-velo', 'non');
});

registerSlide("question-bicloo-autres-transports", function () {
    button( '#ic-oui-bicloo', 'oui');
    button( '#ic-non-bicloo', 'non');
});

registerSlide("question-transports-velo", function () {
    button( '#ic-oui-transport', 'oui');
    button( '#ic-non-transport', 'non');
});

registerSlide("question-garer-velo", function () {
    button( '#ic-consigne-velo', 'consigne');
    button( '#ic-sauvage-velo', 'sauvage');
});

let button = function (idbutton, choice) {
    d3.select(idbutton).on('click', function () {
        overrideAnim({
            targets: idbutton,
            scale: 0
        });
        goToNextSlide(choice);
    });
};
