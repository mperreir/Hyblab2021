import React from 'react';
import Home from './Home';
import Theme from './Theme';
import Attributs from './Attributs';
import Moyen from './Moyen';
import AcceuilCarte from './AcceuilCarte';
import CreditPage from './CreditPage';
import equivalent from './equivalent.js'
import imageDefault from '../img/LOGO OK_logo principal.png'
import { indexOf } from 'leaflet/src/core/Util';

class App extends React.Component {

    state = {
        nomPers: null,
        pageId: 0,
        precedId:0,
        themeId:0,
        moyenId:0,
        coords:[47.213878,-1.54051],
        perimetre: [],
        adresse: {
            rue: '',
            codepostal: '',
            ville: ''
        },
        sites: [{
            id: '1',
            titre: 'Site exemple 1',
            img: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Panorama_depuis_Butte_Sainte-Anne.jpg',
            adresse: 'Nantes',
            description: "Ceci est un exemple de site",
            coordonnes: [47.213878, -1.54051],    //latitude_longitude
            type: 4,
        },
        {
            id: '2',
            titre: 'Site exemple 2',
            img: 'https://s.france24.com/media/display/c2e36604-d271-11ea-be16-005056bf87d6/w:1280/p:16x9/NANTES%20CULTURE.webp',
            adresse: 'Nantes',
            description: "Ceci est un exemple de site",
            coordonnes: [48.213878, -1.44051],    //latitude_longitude
            type: 1,
        },
        {
            id: '3',
            titre: 'Site exemple 3',
            img: 'https://www.campusfrance.org/sites/default/files/styles/mobile_visuel_principal_page/public/The%20Erdre%20River%20in%20Nantes_M.jpg?itok=AWmRDl7o',
            adresse: 'Nantes',
            description: "Ceci est un exemple de site",
            coordonnes: [46.213878, -1.64051],    //latitude_longitude
            type: 2,
        }],
        surprise: {
            id:'0',
            titre: 'Exemple point surprise',
            img: 'https://www.geipi-polytech.org/sites/default/files/photos/polytech-nantes_presentation.jpg',
            adresse: 'Nantes',
            description: "Ceci est un exemple de site surprise",
            coordonnes: [47.282001084268046, - 1.5159819190544865],    //latitude_longitude
            type: 3
        }
    };

    getPage = () => {
        switch (this.state.pageId) {
            case 10:
                return <CreditPage getBack={this.getBackFromCredit}/>;
            case 0:
                return <Home onNextPage={this.nextPage} updateNom={this.updateName} onCreditPage={this.creditPage} />;
            case 1:
                return <Theme data={this.state} onNextPage={this.nextPage} onSetTheme={this.updateTheme} onPreviousPage={this.previousPage} />;
            case 2:
                return <Attributs data={this.state} onNextPage={this.nextPage} onSetAttributs={this.updateAttributs} onPreviousPage={this.previousPage} />;
            case 3:
                return <Moyen data={this.state} onSetMoyen={this.updateMoyen} onPreviousPage={this.previousPage} />;
            case 4:
                return <AcceuilCarte data={this.state} onSetMoyen={this.updateMoyen} nomPers={this.state.nomPers} onCreditPage={this.creditPage} restart={this.backToHome}/>;
        }
    };

    creditPage = ()=>{
        let preced = this.state.pageId
        this.setState({pageId: 10, precedId:preced})
    };
    getBackFromCredit = ()=>{
        this.setState({ pageId: this.state.precedId })
    }
    backToHome = () => {
        this.setState({ pageId: 0})
    };

    nextPage = () =>{
        const newPageId = this.state.pageId+1;
        this.setState({pageId:newPageId })
    };
    previousPage = () => {
        const newPageId = this.state.pageId - 1;
        this.setState({ pageId: newPageId })
    };

    updateName = (e) => {
        this.setState({ nomPers: e })
    };

    updateTheme = (e) => {
        this.setState({ themeId: e })
    };

    updateAttributs = (e, f) => {
        this.setState({ coords: e, adresse: f })
    };

    updateMoyen=(e)=>{
        this.setState({moyenId:e});
        this.generatePerimetre(e);
      };

    generatePerimetre = (e) => {
        let moyenTransport = equivalent.moyenEquiv.get(e);
       fetch(`http://localhost:8080/proximite-a/api/get15minzone/${this.state.coords[1]}_${this.state.coords[0]}/${moyenTransport}`)
            .then(perimetre=> perimetre.json())
            .then(perimetre => {
                let abc=[];
                perimetre[0].forEach((l) => {
                    abc.push([l[1],l[0]])
                });
                this.setState({perimetre:abc});
                this.createSites(e)
            })
    };

    //changer url
    createSites = async function (e) {
        let stringAdresse = this.state.adresse.rue.split(' ').join('+') + '+' + this.state.adresse.codepostal.split(' ').join('+') + '+' + this.state.adresse.ville.split(' ').join('+')
        let moyen = equivalent.moyenEquiv.get(e)
        let theme = equivalent.themeEquiv.get(this.state.themeId)
        let lieux = await (await fetch('http://localhost:8080/proximite-a/api/getlocationsforprofile/' + stringAdresse + '/' + moyen + '/' + theme)).json();
        let newSites = []
        let newSurprise;
        if (typeof lieux.lieux === "undefined" || lieux.lieux.length === 0){
            let site = {
                id: 1,
                titre: 'Pas de titre disponible',
                img: '',
                adresse: 'Pas d\'adresse disponible',
                description: "Pas de description disponible",
                coordonnes: [1, 2],    //latitude_longitude
                type: 0,
            }
            newSites.push(site)
        }
        else{
            for (let i of lieux.lieux) {
                let adresse = await (await fetch(`http://localhost:8080/proximite-a/api/coordinates/${i.lat}_${i.lon}`)).json();
                let adresseF = adresse.rue + " " + adresse.codepostal + " " + adresse.ville
                let name = 'Pas de titre disponible'
                if (typeof i.tags.name !== "undefined") {
                    name = i.tags.name
                }
                let description = "Pas de description disponible"
                if (typeof i.tags.description !== "undefined") {
                    description = i.tags.description
                }
                let site = {
                    id: lieux.lieux.indexOf(i)+1,
                    titre: name,
                    img: imageDefault,
                    adresse: adresseF,
                    description: description,
                    coordonnes: [i.lat, i.lon],
                    type: this.state.themeId
                };
                newSites.push(site)
            }
        }
        if (typeof lieux.surprise === "undefined"||lieux.surprise.length===0) {
            let surprise = {
                id: 0,
                titre: 'Pas de titre disponible',
                img: imageDefault,
                adresse: 'Pas d\'adresse disponible',
                description: "Pas de description disponible",
                coordonnes: [1, 2],    //latitude_longitude
                type: 0,
            }
            newSurprise=surprise;
        }
        else {
            let s = lieux.surprise
                let adresseSurp = await (await fetch(`http://localhost:8080/proximite-a/api/coordinates/${s.lat}_${s.lon}`)).json();
                let adresseFS = adresseSurp.rue + " " + adresseSurp.codepostal + " " + adresseSurp.ville
                let nameSurp = 'Pas de titre disponible'
                if (s.tags.name) {
                    nameSurp = lieux.surprise.tags.name
                }
                let descriptionS = "Pas de description disponible"
                if (typeof s.tags.description !== "undefined") {
                    descriptionS = s.tags.description
                }
                let typeS = 0
                if (typeof s.tags.amenity !== "undefined") {
                    typeS = equivalent.themeEquiv.get(s.tags.amenity)
                }
                let lieuSurprise = {
                    id: 0,
                    titre: nameSurp,
                    img: imageDefault,
                    adresse: adresseFS,
                    description: descriptionS,
                    coordonnes: [s.lat, s.lon],
                    type: typeS
                }
                newSurprise=lieuSurprise

        }
        this.setState({
            sites: newSites,
            surprise: newSurprise,
        });
        this.nextPage()

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
