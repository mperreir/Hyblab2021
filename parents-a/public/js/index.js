// init du slider (qui peut aussi faire des fondus enchainé)
let mySlidr = slidr.create('slidr',{
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

let initSlide2_1 = function() {
    d3.select('#button').on('click', function(){
        mySlidr.slide('page-3');
        initSlide3();
    });

}
// on s'occupe de la 1ère slide
initSlide2_1();