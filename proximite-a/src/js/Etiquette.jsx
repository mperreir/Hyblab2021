import React from 'react';
import '../css/AcceuilCarte.css'

class Etiquette extends  React.Component {
    render() {
        return (
            <div  id="containerInterractionEtiquette" class="containersInterraction card">
                <img className="card-img-top" className="imgChoice imgChoiceEtiquette" src="//placekitten.com/148/148" alt="Card image cap"/>
                <div className="card-body m-2">
                    <h5 className="card-title">TITRE LIEUX</h5>
                    <p className="card-text">adresse</p>
                    <p className="card-text">Some quick example text to build on the TITRE LIEUX
                        and example text to build on the TITRE LIEUX and example text to build
                        on the TITRE LIEUX and example text to build on the TITRE LIEUX and
                        card's content.</p>
                </div>
                <div id="boutEtiquette"><div class="m-3">1</div></div>
            </div>
        );
    }
}
export default Etiquette;