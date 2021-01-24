let initResults = function(){
    d3.select(".button-suivant-results").on("click", function (){
        mySlidr.slide("home-page");
        initHome();
    });
};
