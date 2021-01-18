// init du slider (qui peut aussi dfaire des fondus enchainé)
let mySlidr = slidr.create('slidr',{
    breadcrumbs: false,
    controls: 'none',
    keyboard: true,
    overflow: true,
    pause: false,
    theme: '#222',
    touch: true,
    transition: 'none'
  }).start();

// on s'occupe de la 1ère slide
initSlide1();