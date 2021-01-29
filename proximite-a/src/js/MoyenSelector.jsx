import React from 'react';
import pied_img from '../img/picto moyen de transport-pied.png'
import roller_img from '../img/picto moyen de transport-roller.png'
import skate_img from '../img/picto moyen de transport-skate.png'
import trotinette_img from '../img/picto moyen de transport-trotinette.png'
import velo_img from '../img/picto moyen de transport-vélo.png'
import fauteuil_img from '../img/picto moyen de transport-fauteuil.png'
import imagHover from '../img/HOVER-moyen de transport-tache-02.png'
import '../css/moyen.css'

class MoyenSelector extends React.Component {
    
    render() {
        const hoverStyle = {
            backgroundImage: `url(${imagHover})`
        };
        return (
            <div className=" m-5 d-flex justify-content-center align-items-center flex-column">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <input type="radio" name="moyen" id="pied" className="input-hidden" onClick={(e) => { this.props.updateSelect(1) }}/>
                            <label htmlFor="pied">
                                <img src={pied_img} alt="pied" style={hoverStyle}/>
                            </label>
                        </div>

                        <div className="col" >
                            <input type="radio" name="moyen" id="velo" className="input-hidden" onClick={(e) => { this.props.updateSelect(2) }}/>
                            <label htmlFor="velo">
                                <img src={velo_img} alt="velo" style={hoverStyle}/>
                            </label>
                        </div>

                        <div className="col">
                            <input type="radio" name="moyen" id="fauteuil" className="input-hidden" onClick={(e) => { this.props.updateSelect(3) }}/>
                            <label htmlFor="fauteuil">
                                <img src={fauteuil_img} alt="fauteuil" style={hoverStyle}/>
                            </label>
                        </div>

                        <div className="col">
                            <input type="radio" name="moyen" id="trotinette" className="input-hidden" onClick={(e) => { this.props.updateSelect(4) }}/>
                            <label htmlFor="trotinette">
                                <img src={trotinette_img} alt="trotinette" style={hoverStyle}/>
                            </label>
                        </div>

                        <div className="col">
                            <input type="radio" name="moyen" id="skate" className="input-hidden" onClick={(e) => { this.props.updateSelect(5) }}/>
                            <label htmlFor="skate">
                                <img src={skate_img} alt="skate" style={hoverStyle}/>
                            </label>
                        </div>

                        <div className="col">
                            <input type="radio" name="moyen" id="roller" className="input-hidden" onClick={(e) => {this.props.updateSelect(6)}}/>
                            <label htmlFor="roller">
                                <img src={roller_img} alt="roller" style={hoverStyle}/>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MoyenSelector;