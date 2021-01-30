import React from 'react';
import logo from '../img/LOGO OK_logo principal.png'
import '../css/home.css'
class Home extends  React.Component {
    
    state = {
        nomPers:""
    }

    updateName= (e)=>{
        this.setState({nomPers:e.target.value})
    }

    render() {
        const {onNextPage} = this.props;
        return (
            <div id="homeContainer" class="container">
                <div class="container d-flex justify-content-center align-items-center flex-column">
                    <img src={logo} id='logo'></img>
                    <span id="paragraphe" class="text-center">Bienvenue sur EnvironNantes ! Cette application te permettra de découvrir tout ce qu’il y a autour de toi dans un rayon d’un quart d’heure ! </span>
                    <h4>Comment t’appelles-tu ?</h4>
                    <input type='text' placeholder='entrez votre prénom' onChange={this.updateName}/>
                    <input type='button' value='EXPLORER' onClick={(e) => { this.props.getName(this.state.nomPers) }, onNextPage}/>
                </div>
                <div class="d-flex justify-content-end">
                    <input id="credits" type='button' value='Crédits' />
                </div>
            </div>
        );
    }
}
export default Home;