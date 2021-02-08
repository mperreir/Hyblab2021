for (let t =2;t<6;t++){
    let section = document.querySelector('section[data-slidr="page-' + t + '"]');
    console.log(section.querySelector('button'));
    if(t===5){
        section.querySelector('.button_tuto').addEventListener('click',function (e){
            initSlide2();
            mySlidr.slide('page-'+(t+1));
        })
    }else {
        section.querySelector('.button_tuto').addEventListener('click', function (e) {
            mySlidr.slide('page-' + (t + 1));
        })
    }
    if(t!==2) {
        section.querySelector('.button_tuto_precedent').addEventListener('click', function (e) {
            mySlidr.slide('page-' + (t - 1));
        })
    }
}