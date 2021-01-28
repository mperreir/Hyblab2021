import React from 'react';
import {MapContainer, TileLayer, Marker, Popup, Circle} from 'react-leaflet'
import '../css/AcceuilCarte.css'
import CarteInterractionChoixLieu from './CarteInterractionChoixLieu'
import PopupAnnonce from './PopupAnnonce'
import CarteInterractionChoixMultiples from './CarteInterractionChoixMultiples'
import L from "leaflet"
import {getPosition} from "leaflet/src/dom/DomUtil";

const decallageCentrageCarte = 0.004;

function GetIcon(_iconsize){
    return L.icon({
        iconUrl : require("../img/pictogrammes_position.png").default,
        iconSize: [_iconsize,35]
    })
}



class AcceuilCarte extends  React.Component {
    state={
        popupPhase : 2,
        currentPosition: [47.2819, -1.5158]
    };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(function(position) {   //une fois la position récupérée
            this.setState( {
                currentPosition: [position.coords.latitude,position.coords.longitude]
            })
        }.bind(this));
    }


    getPhase = () =>{
        console.log("2");
        switch (this.state.popupPhase) {
            case 0:
                return null;
            case 1:
                return <CarteInterractionChoixLieu onNextPhase={this.nextPhase}/>;
            case 2:
                return <CarteInterractionChoixMultiples onNextPhase={this.nextPhase}/>;
        }
    };

    nextPhase = () =>{
        const newPopupPhase = this.state.popupPhase+1;
        this.setState({popupPhase:newPopupPhase })
    };
    previousPhase = () =>{
        const newPopupPhase = this.state.popupPhase-1;
        this.setState({popupPhase:newPopupPhase })
    };



    render() {
        const redOptions = { color: '#999999' }
        return (
            <div id="map">
                <MapContainer center={[this.state.currentPosition[0],this.state.currentPosition[1]-decallageCentrageCarte]} zoom={16} scrollWheelZoom={true}>
                    <TileLayer url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"} />
                    <Marker icon={GetIcon(20)}  position={this.state.currentPosition}>
                        <Popup> A pretty CSS3 popup. <br /> Easily customizable. </Popup>
                    </Marker>
                    <Circle center={this.state.currentPosition} pathOptions={redOptions} radius={500} />
                </MapContainer>

                <PopupAnnonce/>
                {this.getPhase()}
                <div id="containerButtonsMapNavigation">
                    <a href="https://www.google.com/" class="buttonMapNavigation">Ouvrir l’itinéraire avec GoogleMaps</a>
                    <a href="https://www.google.com/" class="buttonMapNavigation">Télécharger la carte en PDF</a>
                </div>
            </div>
        );
    }
}
export default AcceuilCarte;