import React from 'react';
import logo1 from '../img/LOGO OK_logo bleu.png'
import perso1 from '../img/Perso-hyblab-03.png'
import maison from '../img/pictogrammes_maison.png'
import '../css/attributs.css'

class Attributs extends React.Component{
    state = {
            coords: ""
        }

    render(){
        const {onNextPage, onPreviousPage} = this.props;
        return(
            <div id="attribuscontainer" class="container">
                <div class="row" no-gutters>

                    <div class="col-ld" no-gutters >
                        <div class="leftside">
                            <img id="logoposition" src={logo1} alt="logo"/>
                            <img id="persoposition" src={perso1} alt="perso"/>
                            <p id="textposition">Hello moi c’est Alex !<br /> 
                        Tu aimes rencontrer tes amis dans des bars, déguster des planches apéros et sortir danser ? Alors, suis-moi ! 
                        <br />
                        <br />

                        C’est moi qui vais t’accompagner tout au long de ton parcours. <b>Et pour te guider au mieux, 
                        peux-tu me donner ton adresse ou ta géolocalisation ?</b>
                        </p>
                        
                        </div>

                    </div>

                    <div class="col-ld" no-gutters>
                        <div class="rightside">

                            <img id="maisonposition" src={maison} alt="symbole de maison" />
                           
                            <h3 id="h3position">Choisi ton point de départ</h3>
                            
                            <input id="boutongeolocalisation" type='button' value='Activer ma géolocalisation' />
                            
                            <label id="addresseposition" type='button' > Choisir une adresse</label>
                            
                            <input id="addressetextposition"type='text' placeholder=''/>

                            <input id="validerposition" type='button' value='VALIDER' onClick={onNextPage}/>  
                       
                            <input id="boutonleft" type='button' value='←' onClick={onPreviousPage}/>

                            <input id="boutonrigth"type='button' value='→' onClick={onNextPage}/>

                        </div>
                    </div>


                </div>
            </div>
        );
    }
}

export default Attributs;