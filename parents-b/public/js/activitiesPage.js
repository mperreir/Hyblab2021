let initActivities = function(){
    d3.select('.button-suivant-activities').on('click', function (){
        mySlidr.slide('right');
        initSearchingResults();
    });
};