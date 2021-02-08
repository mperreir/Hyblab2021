// init du slider (qui peut aussi dfaire des fondus enchainé)
const mySlidr = slidr.create('slidr', {
    breadcrumbs: false,
    controls: 'none',
    direction: 'vertical',
    fade: true,
    keyboard: false,
    overflow: true,
    pause: false,
    theme: '#222',
    timing: { 'fade': '0.2s ease-in' },
    touch: true,
    transition: 'fade'
}).start();

// on s'occupe de la 1ère slide;
initSlide1();