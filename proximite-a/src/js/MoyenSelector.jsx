import React from 'react';
import logo from '../img/LOGO OK_logo principal.png'
import pied_img from '../img/picto moyen de transport-pied.png'
import roller_img from '../img/picto moyen de transport-roller.png'
import skate_img from '../img/picto moyen de transport-skate.png'
import trotinette_img from '../img/picto moyen de transport-trotinette.png'
import velo_img from '../img/picto moyen de transport-vélo.png'
import fauteuil_img from '../img/picto moyen de transport-fauteuil.png'
import '../css/moyen.css'
class MoyenSelector extends React.Component {
    render() {
        const { onNextPage, onPreviousPage } = this.props;
        return (
            <div className=" m-5 d-flex justify-content-center align-items-center flex-column">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <input type="radio" name="moyen" id="pied" className="input-hidden" />
                            <label htmlFor="pied">
                                <img src={pied_img} alt="pied" />
                            </label>
                        </div>

                        <div className="col">
                            <input type="radio" name="moyen" id="velo" className="input-hidden" />
                            <label htmlFor="velo">
                                <img src={velo_img} alt="velo" />
                            </label>
                        </div>

                        <div className="col">
                            <input type="radio" name="moyen" id="fauteuil" className="input-hidden" />
                            <label htmlFor="fauteuil">
                                <img src={fauteuil_img} alt="fauteuil" />
                            </label>
                        </div>

                        <div className="col">
                            <input type="radio" name="moyen" id="trotinette" className="input-hidden" />
                            <label htmlFor="trotinette">
                                <img src={trotinette_img} alt="trotinette" />
                            </label>
                        </div>

                        <div className="col">
                            <input type="radio" name="moyen" id="skate" className="input-hidden" />
                            <label htmlFor="skate">
                                <img src={skate_img} alt="skate" />
                            </label>
                        </div>

                        <div className="col">
                            <input type="radio" name="moyen" id="roller" className="input-hidden" />
                            <label htmlFor="roller">
                                <img src={roller_img} alt="roller" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MoyenSelector;