let initResults = function(){
    d3.select(".button-suivant-results").on("click", function (){
        mySlidr.slide("home-page");
        initHome();
    });

};

d3.select(".results_card").on("click", function (){
    console.log(this);
    document.getElementById("modal_more_information").style.visibility = "visible";
});
