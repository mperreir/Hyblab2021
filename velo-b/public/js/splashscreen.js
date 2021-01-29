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
            anim.destroy();
            goToNextSlide('timeout');
        }, 2000);
    });
});
