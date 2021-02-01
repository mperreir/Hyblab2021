import React from 'react';
import {MapContainer, TileLayer, Marker, Popup, Circle} from 'react-leaflet'
import '../css/AcceuilCarte.css'
import CarteInterractionChoixLieu from './CarteInterractionChoixLieu'
import PopupAnnonce from './PopupAnnonce'
import CarteInterractionChoixMultiples from './CarteInterractionChoixMultiples'
import CarteInterractionChoixMultiplesReduit from './CarteInterractionChoixMultiplesReduit'
import L from "leaflet"
import {getPosition} from "leaflet/src/dom/DomUtil";
import { Polyline } from 'leaflet';

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
        currentPosition: this.props.data.coords,
        sites:this.props.data.sites,
        adresse:this.props.data.adresse,
        moyenId:this.props.data.moyenId,
        nomPers:this.props.data.nomPers,
        itineraire:[],
        };

    toCreditPage=(c)=>{
        c();
    };


    getPhase(nom){
        switch (this.state.popupPhase) {
            case 0:
                return null;
            case 1:
                return <CarteInterractionChoixLieu data={this.state} nomPers={nom.nomPers} onNextPhase={this.nextPhase}/>;
            case 2:
                return <CarteInterractionChoixMultiples data={this.state} nomPers={nom.nomPers} onSetMoyen={this.updateMoyen} onNextPhase={this.nextPhase}/>;
            case 3:
                return <CarteInterractionChoixMultiplesReduit data={this.state} nomPers={nom.nomPers} onSetMoyen={this.updateMoyen} onPreviousPhase={this.previousPhase}/>;
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

    updateMoyen = (e) => {
        this.setState({ moyenId: e })
        this.props.onSetMoyen(e)
    };

    generateItineraire = () => {
        fetch(`api/getItinerary/${this.state.moyenId}/${this.props.data.coords}/${[43.6471465,0.5841169]}`)
        .then(itineraire => {
            this.setState({itineraire});
        });
    }

    render() {
        console.log(this.state.popupPhase)
        const {nomPers, onCreditPage} = this.props;
        const redOptions = { color: '#999999' }
        return (
            <div id="map">
                <MapContainer center={[this.state.currentPosition[0],this.state.currentPosition[1]-decallageCentrageCarte]} zoom={16} scrollWheelZoom={true}>
                    <TileLayer url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"} />
                    <Marker icon={GetIcon(20)}  position={this.state.currentPosition}>
                        <Popup> A pretty CSS3 popup. <br /> Easily customizable. </Popup>
                    </Marker>
                    <Circle center={this.state.currentPosition} pathOptions={redOptions} radius={500} />
                    {this.state.itineraire ? <Polyline positions={this.state.itineraire}/> : null}
                </MapContainer>

                <PopupAnnonce/>
                {this.getPhase({nomPers})}
                <div id="containerButtonsMapNavigation">
                    <a href="https://www.google.com/" class="buttonMapNavigation">Ouvrir l’itinéraire avec GoogleMaps</a>
                    <input type="button" class="buttonMapNavigation" value="Télécharger la carte en PDF"/>
                    <input type="button" class="buttonMapNavigation" value="Crédits" onClick={()=>{this.toCreditPage(onCreditPage)}} />
                </div>
            </div>
        );
    }
}
export default AcceuilCarte;
