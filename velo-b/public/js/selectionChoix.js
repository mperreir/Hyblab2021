registerSlide("question-voiture-velo", function () {
    button( '#ic-oui-voit', 'oui');
    button( '#ic-non-voit', 'non');
});

registerSlide("question-voiture-bicloo", function () {
    button( '#ic-oui-voit-bicloo', 'oui');
    button( '#ic-non-voit-bicloo', 'non');
});

registerSlide("question-voiture-transports", function () {
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

registerSlide("question-garer-velo", function () {
    button( '#ic-consigne-velo', 'consigne');
    button( '#ic-sauvage-velo', 'sauvage');
});

registerSlide("info-abonnements-consignes", async function () {
    button( '#ic-abonnements-consignes', 'ok');
    const request = await fetch('api/abris-velo', {method: 'GET'});
    const data = await request.json();
    const placeStationnementLD = data.reduce((acc, val) => acc + val.capacite, 0);
    const abrisGrat = data.filter(d => !d.conditions.includes('payant'));
    const placesTotAbrisGrat = abrisGrat.reduce((acc, val) => acc + val.capacite, 0);
    const abrisPay = data.filter(d => d.conditions.includes('payant'));
    const placesTotAbrisPay = abrisPay.reduce((acc, val) => acc + val.capacite, 0);
    d3.select('#placesStationnement').html(placeStationnementLD);
    d3.select('#placesGratuites').html(placesTotAbrisGrat);
    d3.select('#abrisExterieurs').html(abrisGrat.length);
    d3.select('#placesPayantes').html(placesTotAbrisPay);
    d3.select('#parcsPay').html(abrisPay.length);

});

registerSlide("question-transports-bicloo", function () {
    button( '#ic-oui-transport-bicloo', 'oui');
    button( '#ic-non-transport-bicloo', 'non');
});

registerSlide("page-arrivee", function () {
    button( '#page-arrivee-continue', 'continuer');
});

registerSlide("page-arrivee-stats", function () {
    button( '#ic-rejouer-finale', 'rejouer');
    button( '#ic-credit-finale', 'credit');
    progressBar('#pb-ecol', window.results.stats.ecologie);
    progressBar('#pb-vit', window.results.stats.vitesse);
    progressBar('#pb-econ', window.results.stats.economie);
    progressBar('#pb-pol', window.results.stats.pollution);
});

registerSlide("page-credit", function () {
    retourbutton('#ic-credit-retour');
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
