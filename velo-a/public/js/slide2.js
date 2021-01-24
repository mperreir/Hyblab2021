let initSlide2 = function(){

    document.getElementById("button-velotafer").onclick = () => {
        mySlidr.slide('page-3');
        initSlide3();
    };

    document.getElementById("button-velododo").onclick = () => {
        mySlidr.slide('page-3');
        initSlide3();
    };

    document.getElementById("button-rouler").onclick = () => {
        mySlidr.slide('page-3');
        initSlide3();
    };

    document.getElementById("button-velodrouiller").onclick = () => {
        mySlidr.slide('page-3');
        initSlide3();
    };

    document.getElementById("button-return-page-2").onclick = () => {
        anime({
            targets: '.button-return-page-2',
            scale: 0.5
        });
        mySlidr.slide('page-1');
        initSlide1();
    };

}