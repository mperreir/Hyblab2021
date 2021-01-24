let initSlide3 = function(){

    document.getElementById("button-classique").onclick = () => {
        document.location.href = "app.html";
    };

    document.getElementById("button-electrique").onclick = () => {
        document.location.href = "app.html";
    };

    document.getElementById("button-pied").onclick = () => {
        document.location.href = "app.html";
    };

    document.getElementById("button-return-page-3").onclick = () => {
        anime({
            targets: '.button-return-page-3',
            scale: 0.5
        });
        mySlidr.slide('page-2');
        initSlide2();
    };

}