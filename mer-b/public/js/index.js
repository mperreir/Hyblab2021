// init du slider (qui peut aussi dfaire des fondus enchainé)
let mySlidr = slidr.create('slidr',{
  breadcrumbs: true,
  controls: 'none',
  direction: 'vertical',
  fade: true,
  keyboard: true,
  overflow: true,
  pause: false,
  theme: '#222',
  timing: { 'fade': '0.5s ease-in' },
  touch: true,
  transition: 'linear'
}).start();

// on s'occupe de la 1ère slide
initSlide1();