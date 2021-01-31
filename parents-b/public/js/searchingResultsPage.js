let initSearchingResults = function(){

    setTimeout(function(){
        mySlidr.slide('down');
        initResults();
    }, 4000);


    //-----------AUDIO--------------
    document.getElementById('activities_audio').pause();

    d3.selectAll('.volume').on('click', function (){
        if(isSonOn){
            this.setAttribute("src", "./img/common/volume_off.svg");
            isSonOn = Boolean(false);
            document.getElementById('result1_audio').pause(); 
        }
        else{
            this.setAttribute("src", "./img/common/volume_on.svg");
            isSonOn = Boolean(true);
            document.getElementById('result1_audio').play(); 
        }
    }); 


};

