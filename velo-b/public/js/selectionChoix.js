registerSlide("question-voiture-velo", function () {
    button( '#ic-oui-voit', 'oui');
    button( '#ic-non-voit', 'non');
});

registerSlide("question-voiture-bicloo", function () {
    button( '#ic-oui-voit-bicloo', 'oui');
    button( '#ic-non-voit-bicloo', 'non');
});

registerSlide("question-voiture-transport", function () {
    button( '#ic-oui-voit-transport', 'oui');
    button( '#ic-non-voit-transport', 'non');
});

registerSlide("question-voiture-parking", function () {
    button( '#ic-gratuit-voit-parking', 'gratuit');
    button( '#ic-payant-voit-parking', 'payant');
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

let button = function (idbutton, choice) {
    d3.select(idbutton).on('click', function () {
        overrideAnim({
            targets: idbutton,
            scale: 0
        });
        goToNextSlide(choice);
    });
};
