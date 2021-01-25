let initFaunaFlora = function(){
    d3.select(".button-suivant-fauna-flora").on("click", function (){
        mySlidr.slide("activities-page");
        initActivities();
    });
};