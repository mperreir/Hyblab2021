registerSlide("splash-screen", function () {
    const anim = bodymovin.loadAnimation({
        container: document.getElementById('logo-anim'),
        path: 'assets/logo-anim.json',
        renderer: 'svg',
        loop: false
    });

    anim.setSpeed(window.devMode ? 2.5 : 1);

    anim.addEventListener("data_ready", () => {
        setTimeout(() => {
            goToSlide('page-accueil');
        }, 2000);
    });
});
