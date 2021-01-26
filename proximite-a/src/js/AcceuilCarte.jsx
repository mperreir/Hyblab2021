import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import '../css/AcceuilCarte.css'
import CarteInterractionChoixLieu from './CarteInterractionChoixLieu'
import CarteInterractionChoixMultiples from './CarteInterractionChoixMultiples'
import Home from "./App";

class AcceuilCarte extends  React.Component {
    state={
        popupPhase : 1
    };

    getPhase = () =>{
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
        return (
            <div id="map">
                <MapContainer center={[47.2819, -1.5158]} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[47.2819, -1.5158]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
                {this.getPhase()}
            </div>
        );
    }
}
export default AcceuilCarte;