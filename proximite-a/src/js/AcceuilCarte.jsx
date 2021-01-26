import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import '../css/AcceuilCarte.css'
import CarteInterractionChoixLieu from './CarteInterractionChoixLieu'

class AcceuilCarte extends  React.Component {
    state={
        popupPhase : 1
    };

    render() {
        return (
            <div id="map">
                <MapContainer center={[47.2819, -1.5158]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[47.2819, -1.5158]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>

                <CarteInterractionChoixLieu/>
            </div>
        );
    }
}
export default AcceuilCarte;