import React from 'react';
import maison from '../img/pictogrammes_maison.png'
import '../css/attributs.css'
import {Spinner} from "react-bootstrap";


import equivalent from './equivalent.js'

class Attributs extends React.Component{
    state = {
        themeId: this.props.data.themeId,
        coords: [0,0],
        adresse:{
            rue:'',
            codepostal:'',
            ville:'',
            validAdress:false
        },
        onSetAttributs : this.props.onSetAttributs,
        onNextPage : this.props.onNextPage,
        choixCoordonnes: false, //si l'utilisateur a décidé d'utiliser la géolocalisation
        loading:false
    };

    getCoords = () =>{
        let urlRue = this.state.adresse.rue.split(' ').join('+');
        let urlCodepostal = this.state.adresse.codepostal.split(' ').join('+');
        let urlVille = this.state.adresse.ville.split(' ').join('+');
        console.log(`http://localhost:8080/proximite-a/api/adresse/${urlRue}+${urlCodepostal}+${urlVille}+france`)
        fetch(`/proximite-a/api/adresse/${urlRue}+${urlCodepostal}+${urlVille}+france`)
            .then((response) => {   //récupération de la réponse
                if (response.ok) {
                    return response.json();
                }else {
                    this.setState({
                        loading: false
                    });
                }
            })
            .then((donnee) => {  //récupération des données JSON
                this.setState({
                    coords:[donnee.latitude,donnee.longitude],
                    validAdress:true,
                    loading:false
                })
                this.submitAttributs(this.state.onSetAttributs,this.state.onNextPage);
            })
    }

    getLocalAdress = () =>{
        this.setState({loading:true})
        navigator.geolocation.getCurrentPosition(function (position) {   //une fois la position récupérée
            this.setState({
                coords: [position.coords.latitude, position.coords.longitude],
            });
            fetch('/proximite-a/api/coordinates/'+position.coords.latitude+'_'+position.coords.longitude)
                .then((response) => {   //récupération de la réponse
                    if (response.ok) {
                        return response.json();
                    }else{
                        this.setState({
                            loading: false
                        });
                    }
                })
                .then((donnee) => {  //récupération des données JSON
                    this.setState({
                        adresse:{
                            codepostal:donnee.codepostal,
                            rue:donnee.rue,
                            ville:donnee.ville,
                        },
                        loading:false,
                        validAdress:true
                    });
                    this.submitAttributs(this.state.onSetAttributs,this.state.onNextPage);
                })

        }.bind(this));
    };


    handleChangeRue = (event) => {
        const value = event.currentTarget.value;
        let newAdress = this.state.adresse;
        newAdress.rue = value
        this.setState({
            adresse : newAdress,
            validAdress:false
        })
    };
    handleChangeVille = (event) => {
        const value = event.currentTarget.value;
        let newAdress = this.state.adresse;
        newAdress.ville = value
        this.setState({
            adresse : newAdress,
            validAdress:false
        })
    };
    handleChangeCP = (event) => {
        const value = event.currentTarget.value;
        let newAdress = this.state.adresse;
        newAdress.codepostal = value
        this.setState({
            adresse : newAdress,
            validAdress:false
        })
    };

    //envoi données + changement page
    submitAttributs = (update, NextPage) => {
        //todo envoyer coords + adresse uniquement
        update(this.state.coords,this.state.adresse);
        NextPage();
    };

    getSpinner() {
        if(this.state.loading == true){
            return <Spinner animation="border" variant="light"></Spinner>
        }
    }



    render(){
        const { onNextPage, onPreviousPage, onSetAttributs} = this.props;
        return(
            <div id="attributContainer" class="d-flex justify-content-center align-items-center ">
                <div id="leftPartAttribut">
                    <div id="leftPurpleContainerAttribut">
                        <div id="containerAttributLeftContent">
                            <img id="logoCorner" src={equivalent.themeLogo.get(this.state.themeId)} width={150} ></img>
                            <div id="blablaMadameAttribut">
                                <img id="ThemeLogoCenter" src={equivalent.themePerso.get(this.state.themeId)} alt="personnage" />
                                <br></br><br></br>
                                <div id="paragrapheBlablaMadameAttribut">
                                    {equivalent.txtattribut.get(this.state.themeId)}
                                    <br/>
                                    <br/>
                                    C’est moi qui vais t’accompagner tout au long  de ton parcours. <b>Et pour te guider au mieux,
                                        peux-tu me donner ton adresse ou ta géolocalisation ?</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="rightPartAttribut">
                    <button className="d-flex btn btnNavigationAttribut fa fa-arrow-left" onClick={onPreviousPage} />
                    <div id="rightPartAttributCenter">
                        <img src={maison} class="mb-3" width={40}/>
                        <p id="textChoisi" class="mb-4">Choisi ton point de départ</p>
                        <div className="search">
                            <span className="fa fa-compass"></span>
                            <input  type="button" className="btnAttribut btn" value="Activer la géolocalisation" onClick={ this.getLocalAdress}/>
                        </div>
                        <p class="text-white m-4"><b>OU</b></p>
                        {this.getSpinner()}
                        <div className="search d-flex flex-column">
                            <div class="text-white">Adresse</div>
                            <input class="inputText" placeholder="ex: 23 rue Chopin" value={this.state.adresse.rue} onChange={this.handleChangeRue}/>
                            <div class="text-white">Ville</div>
                            <input class="inputText" placeholder="ex: Nantes" value={this.state.adresse.ville} onChange={this.handleChangeVille}/>
                            <div class="text-white">Code Postal</div>
                            <input class="inputText" placeholder="ex: 44100" value={this.state.adresse.codepostal} onChange={this.handleChangeCP}/>
                        </div>
                        <div>
                            <input type='button' class="border-0 btnWhiteBgpurpleText mt-5 m-1" value="Vérifier l'adresse" onClick={()=>{this.getCoords()}} />
                        </div>
                    </div>
                    <button class="d-flex btn btnNavigationAttribut button fa fa-arrow-right"  onClick={()=>{this.submitAttributs(onSetAttributs,onNextPage)}} disabled={this.state.adresse.ville =='' || this.state.adresse.codepostal=='' || this.state.adresse.rue=='' || this.state.validAdress==false}/>
                </div>
            </div>
        );
    }
}

export default Attributs;
