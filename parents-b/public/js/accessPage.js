let initAccess = function(){
    d3.select(".button-suivant-access").on("click", function (){
        mySlidr.slide("fauna-flora-page");
        initFaunaFlora();
    });
};