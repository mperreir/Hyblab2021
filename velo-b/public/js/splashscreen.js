registerSlide("splash-screen", function () {
    const anim = bodymovin.loadAnimation({
        container: document.getElementById('logo-anim'),
        path: 'assets/logo-anim.json',
        renderer: 'svg',
        loop: false
    });

    const speed = window.devMode ? 2.5 : 1;
    anim.setSpeed(speed);
    anim.addEventListener("data_ready", () => {
        setTimeout(() => {
            anim.destroy();
            goToNextSlide('timeout');
        }, 5000 / speed);
    });
});
