registerSlide("infos-selection-voiture", function () {
    const idYesBut = '#ic-oui-voit';
    const idNoBut = '#ic-non-voit';
    button(idYesBut, 'info-choix-velo'); // TODO: changer ça
});

registerSlide("infos-selection-velo", function () {
    const idYesBut = '#ic-oui-velo';
    const idNoBut = '#ic-non-velo';
});

registerSlide("infos-selection-bicloo", function () {
    const idYesBut = '#ic-oui-bicloo';
    const idNoBut = '#ic-non-bicloo';
});

registerSlide("infos-selection-transport", function () {

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
