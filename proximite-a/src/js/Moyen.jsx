import React from 'react';
import logo from '../img/LOGO OK_logo principal.png'
import fetard_img from '../img/Perso-hyblab-03.png'
import MoyenSelector from './MoyenSelector'
import local from '../img/pictogrammes_maison.png'
import '../css/moyen.css'
class Moyen extends  React.Component {
    render() {
        const {onNextPage, onPreviousPage} = this.props;
        return (
            <div>
                <div id="MoyenContainer" class="container-fluid d-flex flex-row">
                    <div class="container align-items-center" >
                        <div id="Theme" class="d-flex flex-column justify-content-center align-items-center position-absolute">
                            <img src={fetard_img} alt="fetard" />
                            <span class="text-center align-middle">Très bien, maintenant que je sais où tu te situes, comment souhaites-tu te déplacer ?</span>
                        </div>
                        <div id="Localisation" class="d-flex flex-column align-items-end">
                            <div class="d-flex flex-column justify-content-end align-items-center p-4">
                                <img src={local} />
                            </div>
                        </div>
                    </div>
                    <img src={logo} width={100} class="mt-2 ml-5 mb-auto position-absolute"></img> 
                    <div id="Moyen" class="container d-flex flex-row align-items-center">
                        <div id="changepage" class="d-flex justify-content-center align-items-center flex-column">
                            <p>Retour</p>
                            <input type='button' value='←' onClick={onPreviousPage} />
                        </div>
                        <div class="m-5 d-flex flex-column justify-content-center align-items-center ">
                            <h3>Choisis ton moyen de déplacement</h3>
                            <MoyenSelector />
                            <input type='button' class="btn btn-primary mb-3" value='Valider' onClick={onNextPage} />
                        </div>
                        <div id="changepage" class="d-flex justify-content-center align-items-center flex-column" >
                            <p>Suivant</p>
                            <input type='button' value='→' onClick={onNextPage} />
                        </div>
                    
                    </div>
                </div>
            </div>
        );
    }
}
export default Moyen;