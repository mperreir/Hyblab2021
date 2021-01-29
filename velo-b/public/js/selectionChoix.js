registerSlide("question-voiture-velo", function () {
    const idYesBut = '#ic-oui-voit';
    const idNoBut = '#ic-non-voit';
    button(idYesBut, 'info-choix-velo'); // TODO: changer ça
});

registerSlide("question-velo-autres-transports", function () {
    const idYesBut = '#ic-oui-velo';
    const idNoBut = '#ic-non-velo';
});

registerSlide("question-bicloo-autres-transports", function () {
    const idYesBut = '#ic-oui-bicloo';
    const idNoBut = '#ic-non-bicloo';
});

registerSlide("question-transports-velo", function () {

});

let button = function (idbutton, page) {
    d3.select(idbutton).on('click', function () {
        overrideAnim({
            targets: idbutton,
            scale: 0
        });
        goToSlide(page);
    });
};
