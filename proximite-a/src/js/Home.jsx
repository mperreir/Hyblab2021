import React from 'react';
import logo from '../img/LOGO OK_logo principal.png'
import '../css/home.css'
class Home extends  React.Component {
    render() {
        const {onNextPage} = this.props;
        return (
            <div id="homeContainer" class="container d-flex justify-content-center align-items-center flex-column">
                
                <img src={logo} width='200'></img>
                <span class="text-center">Bienvenue sur EnvironNantes ! Cette application te permettra de découvrir tout ce qu’il y a autour de toi dans un rayon d’un quart d’heure ! </span>
                <h2>Comment t’appelles-tu ?</h2>
                <input id="inputprenom" type='text' placeholder='entrez votre prénom'/>
                <input id="explorer" type='button' value='Explorer' onClick={onNextPage}/>
            </div>
        );
    }
}
export default Home;