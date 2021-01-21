let initActivities = function(){
    d3.select(".button-next-activities").on("click", function (){
        mySlidr.slide("searching-results-page");
        initSearchingResults();
    });
};