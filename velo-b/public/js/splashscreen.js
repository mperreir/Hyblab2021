// TODO: ajouter splash screen au graphe, choice = timeout

registerSlide("splash-screen", function () {
    const anim = bodymovin.loadAnimation({
        container: document.getElementById('logo-anim'),
        path: 'assets/logo-anim.json',
        renderer: 'svg',
        loop: false
    });

    anim.setSpeed(2.5);

    anim.addEventListener("data_ready", () => {
        setTimeout(() => {
            goToSlide('page-accueil');
        }, 2000);
    });
});
