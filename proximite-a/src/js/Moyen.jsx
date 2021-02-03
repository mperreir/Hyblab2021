import React from 'react';
import MoyenSelector from './MoyenSelector'
import local from '../img/pictogrammes_maison.png'
import '../css/moyen.css'
import { Spinner } from "react-bootstrap";
import equivalent from './equivalent.js'
class Moyen extends  React.Component {
    state = {
        moyenId:null,
        buttonActivate:false,
        themeId: this.props.data.themeId,
        loading:false,
    };

    handleChange = (e) => {
        this.setState({
            moyenId: e,
            buttonActivate:true});
    }
    submitMoyen = (update) => {
        this.setState({loading:true})
        update(this.state.moyenId);
    }

    getSpinner() {
        if(this.state.loading == true){
            return <Spinner animation="border" role="status"></Spinner>
        }
    }

    render() {
        const { onNextPage, onPreviousPage, onSetMoyen} = this.props;
        return (
            <div id="MoyenContainer" class="d-flex justify-content-center align-items-center">

                <div id="Theme" class="d-flex flex-column justify-content-center align-items-center fixed-top">
                    <img id="logoCorner" src={equivalent.themeLogo.get(this.state.themeId)} width={100} ></img>
                    <img id="logoCenter" src={equivalent.themePerso.get(this.state.themeId)} alt="fetard" />
                    <br></br><br></br>
                    <span class="text-center align-middle">Très bien, maintenant que je sais où tu te situes, comment souhaites-tu te déplacer ?</span>
                </div>
                <div id="containerLocalisation">
                    <div id="Localisation" >
                        <div className="d-flex flex-row justify-content-end align-items-end m-5">
                            <img src={local}/>
                        </div>
                    </div>
                </div>

                <div id="Moyen" class="d-flex justify-content-around align-items-center">
                    <div id="changepage" class="d-flex justify-content-center align-items-center flex-column ">
                        <button className='btnNavigationAttributPurple fa fa-arrow-left' onClick={onPreviousPage} />
                        <p>Retour</p>
                    </div>
                    <div class="d-flex flex-column justify-content-center align-items-center ">
                        <h3>Choisis ton moyen de déplacement</h3>
                        {this.getSpinner()}
                        <MoyenSelector data={this.state} updateSelect={this.handleChange}/>
                        <input type='button' class="btn btnValidatePurpleBackground" value='Valider' onClick={() => { this.submitMoyen(onSetMoyen) }} disabled={!this.state.buttonActivate}/>
                    </div>
                    <div id="changepage" class="d-flex justify-content-center align-items-center flex-column">
                        <button className='btn btnNavigationAttributPurple fa fa-arrow-right' onClick={() => { this.submitMoyen(onSetMoyen) }} disabled={!this.state.buttonActivate}/>
                        <p id='suiv'>Suivant</p>
                    </div>
                </div>
            </div>
        );
    }
}
export default Moyen;
