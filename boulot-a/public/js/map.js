

const regenerateMap = function(request){

    mySlidr.slide('page-7.5');
    fetch('api/generate_story/', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify(request)
    })
        .then(response => {return response.json()})
        .then(myReceivedObject => {
            mySlidr.slide('page-8');
            customMap(myReceivedObject,request);
        })


}

const deleteAllMap = function(map){

    map.off();
    map.remove();
    let headertemp = document.getElementsByClassName("header_template")[0];
    let line_header = headertemp.children[0];
    headertemp.innerHTML = "";
    headertemp.appendChild(line_header);
}


var customMap = function(myReceivedObject,request){

    let interestPoint = myReceivedObject.data.places
    let home;

    for (let elem in interestPoint){
        if (interestPoint[elem].type === "home"){
            home = interestPoint[elem].coord;
        }
    }

    var map = L.map('map',{
        center:home,
        zoomControl:true,
    })


    let stamenToner = L.tileLayer('//{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> — Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        subdomains: 'abcd',
        label: 'Toner'
    });
    stamenToner.addTo(map);
    const options = { profile: 'mapbox/walking' };

    var instagrammableIcon = new L.Icon({
        iconUrl: 'img/Hyblab_picto1.svg',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
        iconSize: [50, 100],
        iconAnchor: [12, 50],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    var culinaryIcon = new L.Icon({
        iconUrl: 'img/Hyblab_picto2.svg',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
        iconSize: [50, 100],
        iconAnchor: [12, 50],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    var artIcon = new L.Icon({
        iconUrl: 'img/Hyblab_picto3.svg',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
        iconSize: [50, 100],
        iconAnchor: [12, 50],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    var homeIcon = new L.Icon({
        iconUrl: 'img/HyblabPictoHabitat.svg',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
        iconSize: [50, 100],
        iconAnchor: [12, 50],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    var workIcon = new L.Icon({
        iconUrl: 'img/HyblabPictoboulot.svg',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
        iconSize: [50, 100],
        iconAnchor: [12, 50],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });


    var customOptions =
        {
            'className' : 'custom-popup'
        }

    function pointsArray(items) {
        var pointsArray = new Array();
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            pointsArray.push([item.coord[0],item.coord[1]]);
        }
        return pointsArray;
    }
    var polyline = L.polyline(myReceivedObject.data.path.coordinates).addTo(map);


    var bounds = new L.LatLngBounds(pointsArray(interestPoint));
    map.fitBounds(pointsArray(interestPoint));


    if (map.getZoom() < 10){

        map.setZoom(map.getZoom()*0.91);
    }

    let imagePopup = '<img src="data/ILLUSTRATION%20SVG/ITINERAIRE/Illu%20gauche.svg" class="imagePopup">';
    let markersDict = {};

    let work;
    let nb = myReceivedObject.data.places.length;
    for(let z = 1;z<nb+1;z++) {
        let item = myReceivedObject.data.places[z-1];
        let markerOnClick = function(){
            for (let elem in markersDict){
                markersDict[elem].options.icon.options.iconSize = [50,100];
                markersDict[elem].setIcon(markersDict[elem].options.icon)
            }
            this.options.icon.options.iconSize = [80,130]
            this.setIcon(this.options.icon)
            for(let x= 1;x<nb+1;x++) {
                let headerImg = document.getElementById("circle_header_"+x);
                headerImg.style.width ="40px";
            }
            headerImg = document.getElementById("circle_header_"+z);
            headerImg.style.width ="80px";

        }
        if (item.shortDescr){

            markersDict[item.name] = L.marker({'lat':item.coord[0],'lng':item.coord[1]},{
                title: item.name,
            })

                .on('click',markerOnClick)
                .bindPopup('<b>' + item.name + '</b> <br>' + '<p class="textPopup">'+item.shortDescr+ '</p>'+ '<div id=imgPopup>' +imagePopup + '</div>' ,customOptions)


        }
        else {
            markersDict[item.name] = L.marker({'lat':item.coord[0],'lng':item.coord[1]},{
                title: item.name,
            })
                .on('click',markerOnClick)
                .bindPopup('<b>' + item.name + '</b> <br>' + '<p class="textPopup">'+ '</p>'+ '<div id=imgPopup>' +imagePopup + '</div>' ,customOptions)



        }
        if (item.type === "culinary"){
            markersDict[item.name].options.icon = culinaryIcon;

        }
        else if (item.type === "cultural"){
            markersDict[item.name].options.icon = artIcon;

        }
        else if (item.type === "pointofinterest"){

            markersDict[item.name].options.icon = instagrammableIcon;
        }
        else if (item.type === "home"){

            markersDict[item.name].options.icon = homeIcon;
        }

        else if (item.type === "work"){

            markersDict[item.name].options.icon = workIcon;
            work = item.coord
        }

        markersDict[item.name].addTo(map)
        let instagramSvg = 'img/Hyblab_picto1.svg'
        let culinarySvg = 'img/Hyblab_picto2.svg'
        let artSVG = 'img/Hyblab_picto3.svg'
        let homeSVG = 'img/HyblabPictoHabitat.svg'
        let workSVG = 'img/HyblabPictoboulot.svg'
        let logo;
        let max = document.querySelector('#container').clientWidth*0.9*0.9;
        let svg = document.querySelector('.line_header');
        let header = document.querySelector('.header_template');
        let ns = 'http://www.w3.org/2000/svg';
        svg.querySelector('#main_line').setAttribute('x2',max);
        svg.querySelector('#end').setAttribute('x1',max);
        svg.querySelector('#end').setAttribute('x2',max);
        let img = document.createElement('img');
        img.setAttribute('class', 'circle_header');
        img.markerName  = myReceivedObject.data.places[z-1].name
        let type = myReceivedObject.data.places[z-1].type;
        let currMarker = markersDict[myReceivedObject.data.places[z-1].name];
        if (type === "culinary"){
            logo = culinarySvg;
        }
        else if (type === "cultural"){

            logo = artSVG;

        }
        else if (type === "pointofinterest"){

            logo = instagramSvg;
        }
        else if (type === "home"){
            logo = homeSVG;
        }
        else if (type === "work"){
            logo = workSVG
        }
        img.addEventListener("click",function(){
            currMarker.openPopup()
            let allImg = document.getElementsByClassName("circle_header");
            for (let retImg in allImg) {
                if (allImg[retImg].tagName){
                    allImg[retImg].style.width = "40px";
                }
            };
            this.style.width="80px";
            for (let elem in markersDict){
                markersDict[elem].options.icon.options.iconSize = [50,100];
                markersDict[elem].setIcon(markersDict[elem].options.icon)
            }
            currMarker.options.icon.options.iconSize = [80,130]
            currMarker.setIcon(currMarker.options.icon)

        })


        L.DomUtil.addClass(markersDict[item.name]._icon,"marker_"+(z-1));

        img.setAttribute('src',logo);
        img.id = "circle_header_"+z;
        img.style.left = (z-1) * (max / (nb-1)) + 50 +"px";

        img.style.width = '40px' ;
        let headerTemplate = document.getElementsByClassName("header_template")[0];
        //FAUX FAUX ENCORE FAUX ON PEUT FAIRE BOULOT->WORK
        if (type === "home"){
            headerTemplate.insertBefore(img,headerTemplate.firstElement);
        }
        else if (type === "work"){
            headerTemplate.appendChild(img);
        }
        else header.appendChild(img);
    }
    document.getElementById('buttonValidate').addEventListener("click",function(){
        initSlide4(map,myReceivedObject);
    })
    document.getElementById('regenerate').addEventListener("click",function(){
        deleteAllMap(map);
        regenerateMap(request)
    })
    document.getElementById("precedentMap").addEventListener("click",function(){
        let recuperateUser = new User();
        recuperateUser.updateWork(work)
        recuperateUser.updateHome(home)
        mySlidr.slide('page-7');
        initSlide3(recuperateUser);
    })
}




