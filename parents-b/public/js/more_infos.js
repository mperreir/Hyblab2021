let initMoreInfo = function(){
    
    //Coupe Audio du go ne devrai pas avoir lieu car impossible de cliquer pendant lancement fusée
    document.getElementById('debut_audio').pause();

    d3.select('.go-back-more-infos').on('click', function (){
        mySlidr.slide('down');
        initHome();
    });
}
