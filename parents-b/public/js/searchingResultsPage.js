let initSearchingResults = function(){
    d3.select('.button-next-searching-results').on('click', function (){
        mySlidr.slide('down');
        initResults();
    });
};