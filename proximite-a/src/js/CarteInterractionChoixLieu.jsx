import React from 'react';
import '../css/AcceuilCarte.css'
import logo from '../img/LOGO OK_logo principal.png'


class CarteInterractionChoixLieu extends  React.Component {

    render() {
        const {onNextPhase} = this.props;
        return (
            <div id="containerInterraction" class="container">
                <div class="row">
                    <div id="containerInterractionLeftSection" class="col-xl-4">
                        <div id="containerInterractionLeftUpperSection">

                        </div>
                        <img src={personnage} className="mt-4" width={200}/>
                        <div id="textInterractionIntro">Voyons ce qu’il y a autour de toi ! Voici des lieux qui pourraient t’intéresser. Le(s)quel(s) as-tu envie de visiter ?</div>
                    </div>
                    <div id="containerInterractionRightSection" class="col-xl-8 mt-5">
                        <div class="container mb-5">
                            <div class="row">
                                <div class="col containerChoice">
                                    <h3 className="h3Purple">Le plus près...</h3>
                                    <div className="card">
                                        <img className="card-img-top" class="imgChoice" src="//placekitten.com/148/148" alt="Card image cap"/>
                                            <div className="card-body">
                                                <h5 className="card-title">TITRE LIEUX</h5>
                                                <p className="card-text">adresse</p>
                                                <p className="card-text">Some quick example text to build on the TITRE LIEUX and example text to build on the TITRE LIEUX and example text to build on the TITRE LIEUX and example text to build on the TITRE LIEUX and example text to build on the TITRE LIEUX and make up the bulk of the card's content.</p>
                                            </div>
                                    </div>
                                    <input type="checkbox" class="mt-3" name="choixLieux"/>
                                </div>
                                <div class="col containerChoice">
                                    <h3 className="h3Purple">Le hasard...</h3>
                                    <div className="card">
                                        <img className="card-img-top" class="imgChoice" src="//placekitten.com/148/148" alt="Card image cap"/>
                                        <div className="card-body">
                                            <h5 className="card-title">TITRE LIEUX</h5>
                                            <p className="card-text">adresse</p>
                                            <p className="card-text">Some quick example text to build on the TITRE LIEUX and example text to build on the TITRE LIEUX and example text to build on the TITRE LIEUX and example text to build on the TITRE LIEUX and example text to build on the TITRE LIEUX and make up the bulk of the card's content.</p>
                                        </div>
                                    </div>
                                    <input type="checkbox" class="mt-3" name="choixLieux"/>
                                </div>
                                <div class="col containerChoice">
                                    <h3 className="h3Purple">Le troisième...</h3>
                                    <div className="card">
                                        <img className="card-img-top" class="imgChoice" src="//placekitten.com/148/148" alt="Card image cap"/>
                                        <div className="card-body">
                                            <h5 className="card-title">TITRE LIEUX</h5>
                                            <p className="card-text">adresse</p>
                                            <p className="card-text">Some quick example text to build on the TITRE LIEUX and example text to build on the TITRE LIEUX and example text to build on the TITRE LIEUX and example text to build on the TITRE LIEUX and example text to build on the TITRE LIEUX and make up the bulk of the card's content.</p>
                                        </div>
                                    </div>
                                    <input type="checkbox" class="mt-3" name="choixLieux"/>
                                </div>
                            </div>
                        </div>
                            <input type='button' width="50" class="btn btnPurple" value="Valider" onClick={onNextPhase}/>
                    </div>
                </div>
            </div>
        );
    }
}
export default CarteInterractionChoixLieu;