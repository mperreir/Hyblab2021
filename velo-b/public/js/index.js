// init du slider (qui peut aussi dfaire des fondus enchainé)
let mySlidr = slidr.create('slidr', {
    breadcrumbs: false,
    controls: 'none',
    direction: 'vertical',
    fade: true,
    keyboard: true,
    overflow: true,
    pause: false,
    theme: '#222',
    timing: { 'fade': '0.5s ease-in' },
    touch: true,
    transition: 'fade'
}).start();

if (window.devMode) {
    const debugText = document.createElement('span');
    debugText.id = "debug-text";
    document.body.append(debugText);
}

initButtons();

goToSlide(window.location.hash || "splash-screen");
