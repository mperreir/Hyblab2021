let initSlide1 = function(){

    document.getElementById("button-home").onclick = () => {
        mySlidr.slide('page-2');
        initSlide2();
    };

}