let initFaunaFlora = function(){
    d3.select(".button-next-fauna-flora").on("click", function (){
        mySlidr.slide("searching-results-page");
        initSearchingResults();
    });
};