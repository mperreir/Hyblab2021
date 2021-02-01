let initSearchingResults = function() {

    muteAll();
    setTimeout(function() {
        mySlidr.slide('down');
        initResults();
    }, 4000);


    // ----------- AUDIO --------------
    document.getElementById('activities_audio').pause();

    if (isSonOn) {
        document.getElementById('result1_audio').play();
        document.getElementById('result1_audio').loop = false;
    }
    else buutonVol.setAttribute("src", "./img/common/volume_off.svg");


    d3.selectAll('.volume').on('click', function() {
        if (isSonOn) {
            this.setAttribute("src", "./img/common/volume_off.svg");
            isSonOn = Boolean(false);
            document.getElementById('result1_audio').pause();
        } else {
            this.setAttribute("src", "./img/common/volume_on.svg");
            isSonOn = Boolean(true);
            document.getElementById('result1_audio').play();
        }
    });

};
