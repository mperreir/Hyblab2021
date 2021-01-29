import React from 'react';
import logo from '../img/LOGO OK_logo principal.png'
import fetard_img from '../img/Perso-hyblab-03.png'
import MoyenSelector from './MoyenSelector'
import local from '../img/pictogrammes_maison.png'
import '../css/moyen.css'
class Moyen extends  React.Component {
    state = {
        moyenId:null,
        buttonActivate:false
    };

    handleChange = (e) => {
        this.setState({
            vehicule: e,
            buttonActivate:true});
        console.log(e);
    }

    render() {
        const {onNextPage, onPreviousPage} = this.props;
        return (
            <div id="MoyenContainer" class="container-fluid d-flex flex-row">
                <div class="container align-items-center" >
                    <div id="Theme" class="d-flex flex-column justify-content-center align-items-center fixed-top">
                        <img src={logo} width={100} class=" fixed-top"></img> 
                        <img src={fetard_img} alt="fetard" />
                        <span class="text-center align-middle">Très bien, maintenant que je sais où tu te situes, comment souhaites-tu te déplacer ?</span>
                    </div>
                    <div id="Localisation" class="d-flex flex-column align-items-end fixed-top">
                        <div class="d-flex flex-column justify-content-end align-items-center p-5">
                            <img src={local} />
                        </div>
                    </div>
                </div>
                <div id="Moyen" class="container d-flex flex-row align-items-center">
                    <div id="changepage" class="d-flex justify-content-center align-items-center flex-column ">
                        <input type='button' value='←' onClick={onPreviousPage} />
                        <p>Retour</p>
                    </div>
                    <div class="d-flex flex-column justify-content-center align-items-center ">
                        <h3>Choisis ton moyen de déplacement</h3>
                        <MoyenSelector updateSelect={this.handleChange}/>
                        <input type='button' class="btn btn-primary mb-3" value='Valider' onClick={onNextPage} />
                    </div>
                    <div id="changepage" class="d-flex justify-content-center align-items-center flex-column">
                        <input type='button' value='→' onClick={onNextPage} disabled={!this.state.buttonActivate}/>
                        <p id='suiv'>Suivant</p>
                    </div>
                </div>
            </div>
        );
    }
}
export default Moyen;