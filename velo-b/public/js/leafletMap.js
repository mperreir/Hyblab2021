let getVisuals = function(){
    return {
        "amenagements-cyclables" : {
            "color": "orange",
            "icon":"hammer"
        },
        "abris-velo" : {
            "color":"blue",
            "icon":"warehouse"
        },
        "gonfleurs-libre-service":{
            "color":"green",
            "icon":"gas-pump"
        },
        "stations-velo-libre-service":{
            "color":"orange",
            "icon":"bicycle"
        },
        "arrets-tan":{
            "color":"purple",
            "icon":""//"bus" plus joli mais temps de chargment élevé
        },
        "velocistes" : {
            "color": "red",
            "icon": "store"
        },
        "services-velo-bicloo":{
            "color":"cadetblue",
            "icon":"bicycle"
        },
        "disponibilites-parcs-relais":{
            "color":"darkgreen",
            "icon":"car"
        },
        "disponibilites-places-parking":{
            "color":"darkred",
            "icon":"parking"
        },
        "disponibilites-bicloo":{
            "color":"darkpurple",
            "icon":"bicycle"
        }
    }
}

async function fetchData(categorie,quartier){
    const request = await fetch(`api/${categorie}/${quartier}`, {method: 'GET'});
    const data = await request.json();
    return data;
}

async function fetchQuartier(name){
    const request = await fetch(`api/quartiers/${name}`, {method: 'GET'});
    const data = await request.json();
    return data;
}

let initMap = async function() {
    if(window.map) return;

    let nantes = [47.216156, -1.565770];

    let map = L.map('map-large', {
        center: nantes,
        zoom: 12,
        scrollWheelZoom: true,
        markerZoomAnimation: false
    });

    L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
    .addTo(map);

    /*
    let lat, lng;
    map.addEventListener('click', function(e) {
        lat = e.latlng.lat;
        lng = e.latlng.lng;
        console.log('event click:')
        console.log(lat,':',lng);
    });
     */
    window.map = map;
}

let centerMap = async function(quartierDepart){
    let pointsQuartier = await fetchQuartier(quartierDepart);

    let polygonQuartier = L.polygon(pointsQuartier);

    let center = polygonQuartier.getBounds().getCenter();

    //animation vite fait stylée
    window.map.panTo(center,8);
    window.map.panTo(center,12);
}

let clearData = async function(){
    if(window.mapLayers){
        window.mapLayers.map(group => group.clearLayers());
    }

    if(window.mapControl){
        window.mapControl.remove(window.map);
    }
}

//requetes : ensemble de tuple [categorie, quartier]
let displayData = async function(requetes, quartierDepart){
    //creation de la map si elle n'existe pas
    await initMap();

    //centrage de la map sur le quartier de départ
    await centerMap(quartierDepart);

    //suppression des donnees présentes sur la map
    await clearData();

    let pointsCollections = [];

    for(requete of requetes){
        let points = await fetchData(requete.categorie, requete.quartier);
        pointsCollections.push({
            "categorie": requete.categorie,
            "quartier":requete.quartier,
            "points":points
        });
    }

    const visuals = getVisuals();
    let layersNames = [];
    if(!window.mapLayers) window.mapLayers = [];

    pointsCollections.map(item => {
        let layerGrp = L.layerGroup(item.points.map((point) => {
            let customMarker = L.AwesomeMarkers.icon({
                prefix: 'fa',
                icon: visuals[item.categorie].icon,
                markerColor: visuals[item.categorie].color
            });
            return L.marker([point.location[0], point.location[1]], {icon: customMarker}).bindTooltip(point.desc);
        })).addTo(window.map);

        layersNames[item.categorie] = layerGrp;
        window.mapLayers.push(layerGrp);
    });

    window.mapControl = L.control.layers([],layersNames).addTo(window.map);
}
