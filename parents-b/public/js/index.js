// init du slider (qui peut aussi dfaire des fondus enchainé)
let mySlidr = slidr.create('slidr',{
    breadcrumbs: false,
    controls: 'none',
    direction: 'vertical',
    fade: true,
    keyboard: false,
    overflow: false,
    pause: false,
    theme: '#222',
    timing: { 'fade': '0.5s ease-in' },
    touch: false,
    transition: 'fade'
  }).start();

// on s'occupe de la 1ère slide
initHome();