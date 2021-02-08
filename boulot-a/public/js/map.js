

const regenerateMap = function(request,demo){

    //Used to regenerate the map in case of itinerary regen
    mySlidr.slide('page-7.5');
    if (demo){
        setTimeout(function(){
            fetch('data/fake_path/path01.json')
                .then(response => { return response.json() })
                .then(myReceivedObject => {
                    mySlidr.slide('page-8');
                    myReceivedObject.Demo = true;
                    customMap(myReceivedObject, request);
                })},5000);
    }
    else {

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


}

const deleteAllMap = function(map){
    //Delete all the map and remove everything

    map.eachLayer(function(layer){
        map.removeLayer(layer);
    });
    map.off();
    map.remove();

    map = null;
    let headertemp = document.getElementsByClassName("header_template")[0];
    let line_header = headertemp.children[0];
    for (let elem in headertemp.children){
        if (headertemp.children[elem].tagName === "DIV"){
            headertemp.children[elem].innerHTML = "";
        }
        else if (headertemp.children[elem].tagName === "IMG"){
            headertemp.children[elem].innerHTML = "";
        }

    }
}


var customMap = function(myReceivedObject,request){
    //Create map from a list of points to go through 

    let interestPoint = myReceivedObject.data.places
    let home;

    for (let elem in interestPoint){
        if (interestPoint[elem].type === "home"){
            home = interestPoint[elem].coord;
        }
    }

    console.log(myReceivedObject);
    let transport = document.getElementById("transport-list").value;
    let p = document.createElement("p");
    let br = document.createElement("br");

    p.innerHTML = "Avec ma carotte magique j'estime que le trajet mesure " + Math.round(parseFloat(myReceivedObject.data.path.distance/1000)*10)/10 +" kms, et j'estime le temps pour le parcourir de " + Math.round(myReceivedObject.data.path.traveltime / 60 * 10)/10 + " minutes "; 

    if (transport === "motorcar" ){
        p.innerHTML += " en voiture"
    }
    else if (transport === "bicycle"){
        p.innerHTML += " en vélo"
    }
    else {
        p.innerHTML += " à pieds"
    }
    p.innerHTML += " , est-ce que cela te convient ?";
    document.getElementById("titleItinerary").innerHTML= "";
    document.getElementById("titleItinerary").innerHTML= "<strong> Voici mon itinéraire ! </strong>";
    document.getElementById("titleItinerary").appendChild(br);
    document.getElementById("titleItinerary").appendChild(p);

    var container = L.DomUtil.get('map');

    if(container != null){
        container._leaflet_id = null;
    }
    let map = L.map('map',{
        center:home,
        zoomControl:false,
    })
    new L.Control.Zoom({ position: 'bottomleft' }).addTo(map);


    var Stamen_TonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png'
    });
    // Map used is Toner lite (white and black map)
    Stamen_TonerLite.addTo(map);

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

    map.fitBounds(pointsArray(interestPoint));


    if (map.getZoom() < 10){

        map.setZoom(map.getZoom()*0.91);  //To get a representative zoom along with the points
    }

    let imagePopup = '<img src="data/ILLUSTRATION%20SVG/ITINERAIRE/Illu%20gauche.svg" class="imagePopup">';
    let markersDict = {};

    let work;
    let nb = myReceivedObject.data.places.length;
    for(let z = 1;z<nb+1;z++) {
        let item = myReceivedObject.data.places[z-1];
        let markerOnClick = function(){
            //Allows to make marker icon and corresponding image in the header to grow on click
            for (let elem in markersDict){
                markersDict[elem].options.icon.options.iconSize = [50,100];
                markersDict[elem].setIcon(markersDict[elem].options.icon)
            }
            this.options.icon.options.iconSize = [80,130]
            this.setIcon(this.options.icon)
            let headerImg;
            for(let x= 1;x<nb+1;x++) {
                headerImg = document.getElementById("circle_header_"+x);
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
            //Puts on click event on header images to get marker to grow on click 
            currMarker.openPopup()
            let allImg = document.getElementsByClassName("circle_header");
            for (let retImg in allImg) {
                if (allImg[retImg].tagName){
                    allImg[retImg].style.width = "40px";
                }
            }
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
        let div = document.getElementById("divHeaderP");
        div.style.width = max + "px";

        if (type === "home" && interestPoint[0].type === "home"){
            //If starting from home
            headerTemplate.insertBefore(img,headerTemplate.firstElement);
        }
        else if (type === "work" && interestPoint[0].type === "work"){

            //If starting fromwork  
            headerTemplate.insertBefore(img,headerTemplate.firstElement);
        }
        else header.appendChild(img);

        if (item.path){
            let p = document.createElement("p");
            console.log(item)
            let text = document.createTextNode(Math.round(parseFloat(item.path.traveltime)/60) + " Minutes ");
            p.appendChild(text)
            p.className = "textHeader";
            p.style.textAlign = "center";
            p.style.fontSize = "0.15em";
            p.style.display= "inline-block";
            p.style.fontFamily = "Roboto";
            p.style.fontWeight = "bold";
            div.appendChild(p);
        }


    }
    let eventonClick = function(){
        map.closePopup();
        initSlide4(map,myReceivedObject);
    }
    console.log(myReceivedObject);

    document.getElementById('buttonValidate').removeEventListener("click",eventonClick);
    document.getElementById('buttonValidate').addEventListener("click",eventonClick)


    let regenerateonClick = function(){

        deleteAllMap(map);
        regenerateMap(request,myReceivedObject.Demo)
    };

    document.getElementById('regenerate').removeEventListener("click",regenerateonClick);
    document.getElementById('regenerate').addEventListener("click", regenerateonClick);

    let precedentonClick = function(){
        let recuperateUser = new User();
        work = {latlng: {lat:work[0],lng:work[1]}}
        home = {latlng: {lat:home[0],lng:home[1]}}
        recuperateUser.updateWork(work)
        recuperateUser.updateHome(home)
        recuperateUser.demo = myReceivedObject.Demo;

        let transport = document.getElementById("transport-list").value;
        recuperateUser.transport = transport;
        mySlidr.slide('page-7');
        initSlide3(recuperateUser);
    }
    document.getElementById("precedentMap").addEventListener("click",precedentonClick)
    document.getElementById('precedentMap').addEventListener("click", precedentonClick);
}




