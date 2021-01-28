
// console.log(_app_stores)






function getData(nameadd, adresse, storage) {
    fetch('api/' + adresse.longitude + '/' + adresse.latitude
        ,
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(storage),
        }
    )
        .then((response) => {
            response.json().then(
                function (data) {
                    _app_stores["timeline"]['data'][nameadd] = data;
                    _app_stores["timeline"]["done"] = _app_stores["timeline"]["done"] + 1
                    if (_app_stores["timeline"]["done"] == 2) {
                        [_app_stores["timeline"]['data']['adresse1'], _app_stores["timeline"]['data']['adresse2']] = clean_data(
                            _app_stores["timeline"]['data']['adresse1'], _app_stores["timeline"]['data']['adresse2'])
                            $('#waitingSpinner').remove();
                           
                            $('#progressDiv').css('visibility', 'visible')

                            timeline_progressbar_draw();
                    }

                }
            )
        });
}


function timeline_progressbar_draw() {
    var widthCard = ($("#timelineholder").width());
    var heightCard = 300;
    var waiting_time = 1500;
    TimeKnots.draw("#timeline1", _app_stores["timeline"]['data']['adresse1'], { color: ["#2a315b", "#eead1c"], width: widthCard, height: heightCard, showLabels: true, waiting_time: waiting_time });
    TimeKnots.draw("#timeline2", _app_stores["timeline"]['data']['adresse2'], { color: ["#2a315b", "#eead1c"], width: widthCard, height: heightCard, showLabels: true, waiting_time: waiting_time });
    ProgressBar.draw("#progressDiv",_app_stores["timeline"]['data']['adresse1'],_app_stores["timeline"]['data']['adresse2'], waiting_time);
};