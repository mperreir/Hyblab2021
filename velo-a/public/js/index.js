import { initSlide1 } from "./slide1.js";

let mySlidr = slidr.create('slidr', {
    breadcrumbs: false,
    controls: 'none',
    direction: 'vertical',
    fade: true,
    keyboard: true,
    overflow: true,
    pause: false,
    theme: '#222',
    timing: {'fade': '0.5s ease-in'},
    touch: true,
    transition: 'fade'
}).start();

// on s'occupe de la 1ère slide
initSlide1(mySlidr);
