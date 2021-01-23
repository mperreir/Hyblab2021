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

mySlidr.add('h', ['page-3', 'page-4', 'page-5', 'page-6', 'page-7', 'page-8'], "fade");


// on init les slides
initSlide1();
initSlide2();
initSlide3();