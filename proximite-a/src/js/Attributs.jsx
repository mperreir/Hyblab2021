import React from 'react';
import logo1 from '../img/LOGO OK_logo bleu.png'
import perso1 from '../img/Perso-hyblab-03.png'
import maison from '../img/pictogrammes_maison.png'
import '../css/attributs.css'

class Attributs extends React.Component{
    state = {
        coords: [0,0],
        adresse:'',
        choixCoordonnes: false //si l'utilisateur a décidé d'utiliser la géolocalisation
    };

    requestingCoords = () =>{
        console.log("testb");
        navigator.geolocation.getCurrentPosition(function (position) {   //une fois la position récupérée
            this.setState({
                coords: [position.coords.latitude, position.coords.longitude],
                adresse:"2 rue jean bombeur"
            })
            console.log("coords received")
        }.bind(this));
    }


    //permet de mettre à jour le champ texte
    handleChange = (event) => {
        const value = event.currentTarget.value;
        this.setState({adresse : value})
    };

    //envoi données + changement page
    submitAttributs = (update, NextPage) => {
        //todo envoyer coords + adresse uniquement
        update(this.state.coords);
        NextPage();
    };
    render(){
        const { onNextPage, onPreviousPage, onSetAttributs} = this.props;
        return(
            <div id="attributContainer" class="d-flex justify-content-center align-items-center ">
                <div id="leftPartAttribut">
                    <div id="leftPurpleContainerAttribut">
                        <div id="containerAttributLeftContent">
                            <img id="imgLogoAttribut" src={logo1} width={150}/>
                            <div id="blablaMadameAttribut">
                                <img src={perso1}/>
                                <p id="paragrapheBlablaMadameAttribut">Hello moi c’est Alex !
                                    Tu aimes rencontrer tes amis dans des bars, déguster  des planches apéros et sortir danser ? Alors, suis-moi !
                                    <br/>
                                    <br/>
                                    C’est moi qui vais t’accompagner tout au long  de ton parcours. <b>Et pour te guider au mieux,
                                        peux-tu me donner ton adresse ou ta géolocalisation ?</b>b>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="rightPartAttribut">
                    <div className="btn btnNavigationAttribut fa fa-arrow-left" onClick={onPreviousPage}/>
                    <div id="rightPartAttributCenter">
                        <img src={maison} class="mb-3" width={40}/>
                        <p id="textChoisi" class="mb-4">Choisi ton point de départ</p>
                        <div className="search">
                            <span className="fa fa-compass"></span>
                            <input  type="button" className="btnAttribut btn" value="Activer la géolocalisation" onClick={ this.requestingCoords}/>
                        </div>
                        <p class="text-white m-4">OU</p>
                        <div className="search">
                            <span className="fa fa-search fa-xl"></span>
                            <input placeholder="Choisir une adresse" value={this.state.adresse} onChange={this.handleChange}/>
                        </div>
                        <input type='button' class="btnWhiteBgpurpleText mt-5" value="VALIDER" onClick={()=>{this.submitAttributs(onSetAttributs,onNextPage)}}/>
                    </div>
                    <div  class="btn btnNavigationAttribut fa fa-arrow-right"  onClick={()=>{this.submitAttributs(onSetAttributs,onNextPage)}}/>
                </div>
            </div>
        );
    }
}

export default Attributs;
