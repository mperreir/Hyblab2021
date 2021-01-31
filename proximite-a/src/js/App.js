import React from 'react';
import Home from './Home';
import Theme from './Theme';
import Attributs from './Attributs';
import Moyen from './Moyen';
import AcceuilCarte from './AcceuilCarte';
import equivalent from './equivalent.js'
import coordinatestoaddress from '../api/adresstocoordinates'

class App extends  React.Component {

    state = {
        nomPers: null,
        pageId: 0,
        themeId:0,
        moyenId:0,
        coords:[47.215878,-1.55051],
        adresse: {
            rue: '',
            codepostal: '',
            ville: ''
        },
        sites: [{ id: '1',
                titre: 'squalala',
                img: 'https://pbs.twimg.com/profile_images/743774363833503744/-eSLwh6f_400x400.jpg',
                adresse: 'nous sommes partis',
                description : "blabla",
                coordonnes:[1,2],    //latitude_longitude
                type:4,
             },
            { id: '2',
                titre: 'squelele',
                img: 'https://media.tenor.com/images/1c500d0d30c039aef2cc1056a0f4e8e6/tenor.gif',
                adresse: 'nous sommes repartis',
                description : "blabla",
                coordonnes:[3,4],    //latitude_longitude
                type:1,
            },
            { id: '3',
                titre: 'Oooo di',
                img:'https://media.tenor.com/images/5c58bbed210c8bb91dddb88caa8f1ed3/tenor.gif',
                adresse:'AAAAAAAAAAAAAHH',
                description : "blabla",
                coordonnes:[5,6],    //latitude_longitude
                type:2,
            }],
            surprise: {
                id: '3',
                titre: 'Oooo di',
                img: 'https://media.tenor.com/images/5c58bbed210c8bb91dddb88caa8f1ed3/tenor.gif',
                adresse: 'AAAAAAAAAAAAAHH',
                description: "blabla",
                coordonnes: [5, 6],    //latitude_longitude
                type: 3
        }
    };

    getPage = () => {
        switch (this.state.pageId) {
            case 0:
                return <Home onNextPage={this.nextPage} updateNom={this.updateName}/>;
            case 1:
                return <Theme data={this.state} onNextPage={this.nextPage} onSetTheme={this.updateTheme} onPreviousPage={this.previousPage}/>;
            case 2:
                return <Attributs data={this.state} onNextPage={this.nextPage} onSetAttributs={this.updateAttributs} onPreviousPage={this.previousPage}/>;
            case 3:
                return <Moyen data={this.state} onNextPage={this.nextPage} onSetMoyen={this.updateMoyen} onPreviousPage={this.previousPage} />;
            case 4:
                return <AcceuilCarte data={this.state} onSetMoyen={this.updateMoyen} nomPers={this.state.nomPers}/>;
        }
    };




    nextPage = () =>{
        const newPageId = this.state.pageId+1;
        this.setState({pageId:newPageId })
    };
    previousPage = () =>{
        const newPageId = this.state.pageId-1;
        this.setState({pageId:newPageId })
    };

    updateName=(e)=>{
        this.setState({nomPers:e})
    };

    updateTheme = (e) => {
        this.setState({ themeId: e })
    };

    updateAttributs = (e,f) => {
        this.setState({ coords: e,adresse:f})
        this.createSites()
    };

    updateMoyen=(e)=>{
        this.setState({moyenId:e})
    };

    //changer url
    createSites = () => {
        let stringAdresse = this.state.adresse.rue.replace(' ', '+') + '+' + this.state.adresse.codepostal + '+' + this.state.adresse.ville
        let moyen=equivalent.moyenEquiv.get(this.state.moyenId)
        let theme=equivalent.themeEquiv.get(this.state.themeId)
        fetch('https://hyblab.polytech.univ-nantes.fr/proximite-a//api/getlocationsforprofile/' + stringAdresse+'/'+moyen+'/'+theme)
            .then((response) => {   //récupération de la réponse
                if (response.ok) {
                    console.log(response);
                    return response.json();
                }
            })
            .then((donnee) => {  //récupération des données JSON
                console.log("récupération des sites")
                console.log(donnee)
                let site1={id:'1',
                            titre:donnee.lieux[0].name,
                            img:'',
                            adresse: coordinatestoaddress([donnee.lieux[0].lat,donnee.lieux[0].lon]),
                            description:'',
                            coordonnes: [donnee.lieux[0].lat, donnee.lieux[0].lon],
                            type:theme
                }
                let site2 = {
                    id: '2',
                    titre: donnee.lieux[1].name,
                    img: '',
                    adresse: coordinatestoaddress([donnee.lieux[1].lat, donnee.lieux[1].lon]),
                    description: '',
                    coordonnes: [donnee.lieux[1].lat, donnee.lieux[1].lon],
                    type: theme
                }
                let site3 = {
                    id: '3',
                    titre: donnee.lieux[2].name,
                    img: '',
                    adresse: coordinatestoaddress([donnee.lieux[2].lat, donnee.lieux[2].lon]),
                    description: '',
                    coordonnes: [donnee.lieux[2].lat, donnee.lieux[2].lon],
                    type: theme
                }
                let lieuSurprise = {
                    titre: donnee.surprise.name,
                    img: '',
                    adresse: coordinatestoaddress([donnee.surprise.lat, donnee.surprise.lon]),
                    description: '',
                    coordonnes: [donnee.surprise.lat, donnee.surprise.lon],
                    type: donnee.surprise.tag.amenity //todo mettre le bon theme
                }
                this.setState({
                    site: [site1,site2,site3],
                    surprise:lieuSurprise
                });
            })
    }

    render() {
        return (
            <div id="mainContainer">
                {this.getPage()}
            </div>
        );
    }
}

export default App;
