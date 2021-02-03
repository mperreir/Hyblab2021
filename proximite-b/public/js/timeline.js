

function closePapy() {
    $('#timeline_Papy').remove();
}



/**
 * Fonction qui permet de recupérer les données liée a une adresse et selon les 
 * critères choisis
 * 
 * @param {String} nameadd  "adresse1" ou "adresse2" (!= de l'adresse exacte)
 * @param {Object} adresse  adresse avec latitude longitude
 */
function getData(nameadd, adresse) {
    fetch('api/' + adresse.longitude + '/' + adresse.latitude,
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(_app_stores),
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
                        $('#compEnCours').remove();
                        $('#timeline_Papy').css('visibility', 'visible');
                        $('#progressDiv').css('visibility', 'visible');
                        $('#goToConclusion').css('visibility', 'visible');
                        $('#titleTimeline').css('visibility', 'visible');
                        window.addEventListener("resize", timeline_progressbar_draw);

                        timeline_progressbar_draw();
                    }

                }
            )
        });
}



/**
 * Fonction qui permet de dessiner les différents composants graphiques
 */
function timeline_progressbar_draw() {
    $('#timeline_Papy').css('visibility', 'visible');

    var widthCard = ($("#timelineholder").width());
    var heightCard = 260;
    var waiting_time = 1500;
    $("#timeline1").html("<h5>" + _app_stores['adresses']['adresse1']['label'] + "</h5>")
    $("#timeline2").html("<h5>" + _app_stores['adresses']['adresse2']['label'] + "</h5>")

    TimeKnots.draw("#timeline1", _app_stores["timeline"]['data']['adresse1'], { color: ["#2a315b", "#eead1c"], width: widthCard, height: heightCard, showLabels: true, waiting_time: waiting_time });
    TimeKnots.draw("#timeline2", _app_stores["timeline"]['data']['adresse2'], { color: ["#2a315b", "#eead1c"], width: widthCard, height: heightCard, showLabels: true, waiting_time: waiting_time });
    ProgressBar.draw("#progressDiv", _app_stores["timeline"]['data']['adresse1'], _app_stores["timeline"]['data']['adresse2'], waiting_time);
};