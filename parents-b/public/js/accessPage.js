let initAccess = function(){
    d3.select(".button-next-access").on("click", function (){
        mySlidr.slide("fauna-flora-page");
        initFaunaFlora();
    });
};