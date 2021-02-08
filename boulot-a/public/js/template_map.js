

const initSlide4 = function(map,Laze){
    let zoomLevel = map.getZoom();
    let center = map.getCenter();
    let state = 1;
    let coordend = [47.21577513197727, -1.5509283542633054];
    let nb = Laze.data.places.length;
    let list_text = [];
    document.querySelector('section[data-slidr="page-9"]')
        .querySelector(".button").addEventListener('click', function () {
        update_plus();
        mySlidr.slide('page-8');
    })
    document.querySelector('section[data-slidr="page-9"]')
        .querySelector(".button_tuto_precedent").addEventListener('click', function () {
        dezoom(map,center,zoomLevel);
        mySlidr.slide('page-8');
    })
    if(Laze.Demo!==true) {
        d3.json('data/descriptions.json')
            .then(function (data) {
                Laze.data.places.forEach(function (d) {
                    if (d.type !== 'work' && d.type !== 'home') {
                        console.log(d.type);
                        console.log(data[d.type]);
                        if (d.type === 'pointofinterest') {
                            list_text.push(data[d.type][0]);
                        } else {
                            if(data[d.type][d.shortDescr] !== undefined){
                                list_text.push(data[d.type][d.shortDescr][0]);
                            }else{
                                list_text.push(d.shortDescr);
                            }
                        }
                    }
                })
            })
    }else{
        Laze.data.places.forEach(function (d) {
            if (d.type !== 'work' && d.type !== 'home') {
                list_text.push(d.shortDescr);
            }
        })
    }

    document.getElementById("bulle_trajet").style.visibility="visible";
    document.getElementById("itineraryBulle").style.visibility="hidden";
    document.querySelector("#regenerate").style.visibility="hidden";
    document.querySelector("#buttonValidate").style.visibility="hidden";
    document.querySelector("#button_suivant").style.visibility="visible";
    document.querySelector('#precedentWay').style.visibility="visible";
    document.querySelector('#precedentMap').style.visibility="hidden";

    document.querySelector('#button_suivant').addEventListener('click',zoom);
    document.querySelector('#precedentWay').addEventListener('click',precedent);
    update_circle();

    function precedent(){
        document.querySelector('#circle_header_'+ (state+1)).style.width = "40px";
        document.querySelector('#circle_header_'+ (state+1)).style.top = "15%";
        state=state-1;
        if(state===0){
            remove_prec();
            update_circle();
        }else if(state < nb) {
            update_circle();
            zoom();
        }
    }

    function update_plus(){
        document.querySelector('#circle_header_'+ (state+1)).style.width = "40px";
        document.querySelector('#circle_header_'+ (state+1)).style.top = "15%";
        state=state+1;

        if(state < nb) {
            update_circle();
        }
        if (state===nb-1){
            document.getElementById("titletrajet").innerText="C'est bientôt la fin de notre Aventure."
        }
        dezoom(map,center,zoomLevel);
    }

    function zoom(e){
        let lat=0;
        let lng=0;
        if(state<nb) {
            lat = Laze.data.places[state].coord[0];
            lng = Laze.data.places[state].coord[1];
        }else{
            lat = coordend[0];
            lng = coordend[1];
        }
        map.flyTo([lat,lng],19,{animate : true,duration:0.5});
        setTimeout(suiteTraitement,1000);
    }

    function suiteTraitement(){
        map.closePopup();
        if(state<nb-1) {
            let section = document.querySelector('section[data-slidr="page-9"]');
            instaslide(section,Laze.data.places[state],list_text[state-1]);
            mySlidr.slide('page-9');
        }else{
            resume(Laze,map,center,zoomLevel);
            mySlidr.slide('page-10');

        }
    }

    function update_circle(){
        document.querySelector('#circle_header_'+ (state+1)).style.width = "60px";
        document.querySelector('#circle_header_'+ (state+1)).style.top = "7.5%";
    }

    function remove_prec() {
        document.getElementById("bulle_trajet").style.visibility="hidden";
        document.getElementById("itineraryBulle").style.visibility="visible";
        document.querySelector('#button_suivant').removeEventListener('click',zoom);
        document.querySelector('#precedentWay').removeEventListener('click',precedent);
        document.querySelector("#regenerate").style.visibility="visible";
        document.querySelector("#buttonValidate").style.visibility="visible";
        document.querySelector("#button_suivant").style.visibility="hidden";
        document.querySelector('#precedentWay').style.visibility="hidden";
        document.querySelector('#precedentMap').style.visibility="visible";
        document.getElementById("itineraryBulle").style.visibility="visible";
        document.querySelector('section[data-slidr="page-9"]').querySelector(".button").removeEventListener('click', function () {
            update_plus();
            mySlidr.slide('page-8');
        })
        document.querySelector('section[data-slidr="page-9"]').querySelector(".button_tuto_precedent").removeEventListener('click', function () {
        })
    }
}
function dezoom(map,center,zoomLevel){
    map.flyTo(center,zoomLevel,{animate : true,duration:1});
}






