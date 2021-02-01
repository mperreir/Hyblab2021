import React from 'react';
import Home from './Home';
import Theme from './Theme';
import Attributs from './Attributs';
import Moyen from './Moyen';
import AcceuilCarte from './AcceuilCarte';
import equivalent from './equivalent.js'
import imageDefault from '../img/image_pas_disponible.png'

class App extends React.Component {

    state = {
        nomPers: null,
        pageId: 0,
        themeId: 0,
        moyenId: 0,
        coords: [47.215878, -1.55051],
        adresse: {
            rue: '',
            codepostal: '',
            ville: ''
        },
        sites: [{
            id: '1',
            titre: 'squalala',
            img: 'https://pbs.twimg.com/profile_images/743774363833503744/-eSLwh6f_400x400.jpg',
            adresse: 'nous sommes partis',
            description: "blabla",
            coordonnes: [1, 2],    //latitude_longitude
            type: 4,
        },
        {
            id: '2',
            titre: 'squelele',
            img: 'https://media.tenor.com/images/1c500d0d30c039aef2cc1056a0f4e8e6/tenor.gif',
            adresse: 'nous sommes repartis',
            description: "blabla",
            coordonnes: [3, 4],    //latitude_longitude
            type: 1,
        },
        {
            id: '3',
            titre: 'Oooo di',
            img: 'https://media.tenor.com/images/5c58bbed210c8bb91dddb88caa8f1ed3/tenor.gif',
            adresse: 'AAAAAAAAAAAAAHH',
            description: "blabla",
            coordonnes: [5, 6],    //latitude_longitude
            type: 2,
        }],
        surprise: {
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
                return <Home onNextPage={this.nextPage} updateNom={this.updateName} />;
            case 1:
                return <Theme data={this.state} onNextPage={this.nextPage} onSetTheme={this.updateTheme} onPreviousPage={this.previousPage} />;
            case 2:
                return <Attributs data={this.state} onNextPage={this.nextPage} onSetAttributs={this.updateAttributs} onPreviousPage={this.previousPage} />;
            case 3:
                return <Moyen data={this.state} onSetMoyen={this.updateMoyen} onPreviousPage={this.previousPage} />;
            case 4:
                return <AcceuilCarte data={this.state} onSetMoyen={this.updateMoyen} nomPers={this.state.nomPers} />;
        }
    };




    nextPage = () => {
        const newPageId = this.state.pageId + 1;
        this.setState({ pageId: newPageId })
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

    updateMoyen = (e) => {
        this.setState({ moyenId: e })
        this.createSites()
    };

    //changer url
    createSites = async function () {
        let stringAdresse = this.state.adresse.rue.split(' ').join('+') + '+' + this.state.adresse.codepostal.split(' ').join('+') + '+' + this.state.adresse.ville.split(' ').join('+')
        let moyen = equivalent.moyenEquiv.get(this.state.moyenId)
        let theme = equivalent.themeEquiv.get(this.state.themeId)
        console.log("appel de " + 'http://localhost:8080/proximite-a/api/getlocationsforprofile/' + stringAdresse + '/' + moyen + '/' + theme);
        let lieux = await (await fetch('http://localhost:8080/proximite-a/api/getlocationsforprofile/' + stringAdresse + '/' + moyen + '/' + theme)).json();
        console.log(lieux)
        console.log(lieux.length)
        console.log(lieux.lieux.length)
        console.log("appel de " + `http://localhost:8080/proximite-a/api/coordinates/`);
        let site1 = {
            id: '1',
            titre: 'Pas de titre disponible',
            img: imageDefault,
            adresse: 'Pas d\'adresse disponible',
            description: "Pas de description disponible",
            coordonnes: [1, 2],    //latitude_longitude
            type: 4,
        }
        if (lieux.lieux.length >= 1 && typeof lieux.lieux !== "undefined") {
            let adresse1 = await (await fetch(`http://localhost:8080/proximite-a/api/coordinates/${lieux.lieux[0].lat}_${lieux.lieux[0].lon}`)).json();
            let adresseF1 = adresse1.rue + " " + adresse1.codepostal + " " + adresse1.ville
            let name1 = 'Pas de titre disponible'
            if (typeof lieux.lieux[0].tags.name !== "undefined") {
                name1 = lieux.lieux[0].tags.name
            }
            let description1 = "Pas de description disponible"
            if (typeof lieux.lieux[0].tags.description !== "undefined") {
                description1 = lieux.lieux[0].tags.description
            }
            site1 = {
                id: '1',
                titre: name1,
                img: imageDefault,
                adresse: adresseF1,
                description: description1,
                coordonnes: [lieux.lieux[0].lat, lieux.lieux[0].lon],
                type: this.state.themeId
            };

        }
        let site2 = {
            id: '2',
            titre: 'Pas de titre disponible',
            img: imageDefault,
            adresse: 'Pas d\'adresse disponible',
            description: "Pas de description disponible",
            coordonnes: [3, 4],    //latitude_longitude
            type: 4,
        }
        if (lieux.lieux.length >= 2 && typeof lieux.lieux !== "undefined") {
            let adresse2 = await (await fetch(`http://localhost:8080/proximite-a/api/coordinates/${lieux.lieux[1].lat}_${lieux.lieux[1].lon}`)).json();
            let adresseF2 = adresse2.rue + " " + adresse2.codepostal + " " + adresse2.ville
            let name2 = 'Pas de titre disponible'
            if (typeof lieux.lieux[1].tags.name !== "undefined") {
                name2 = lieux.lieux[1].tags.name
            }
            let description2 = "Pas de description disponible"
            if (typeof lieux.lieux[1].tags.description !== "undefined") {
                description2 = lieux.lieux[1].tags.description
            }
            site2 = {
                id: '2',
                titre: name2,
                img: '',
                adresse: adresseF2,
                description: description2,
                coordonnes: [lieux.lieux[1].lat, lieux.lieux[1].lon],
                type: this.state.themeId
            }

        }
        let site3 = {
            id: 'surprise',
            titre: 'Pas de titre disponible',
            img: imageDefault,
            adresse: 'Pas d\'adresse disponible',
            description: "Pas de description disponible",
            coordonnes: [5, 6],    //latitude_longitude
            type: 4,
        }
        if (lieux.lieux.length >= 3 && typeof lieux.lieux !== "undefined") {
            let adresse3 = await (await fetch(`http://localhost:8080/proximite-a/api/coordinates/${lieux.lieux[2].lat}_${lieux.lieux[2].lon}`)).json();
            let adresseF3 = adresse3.rue + " " + adresse3.codepostal + " " + adresse3.ville
            let name3 = 'Pas de titre disponible'
            if (typeof lieux.lieux[2].tags.name !== "undefined") {
                name3 = lieux.lieux[2].tags.name
            }
            let description3 = "Pas de description disponible"
            if (typeof lieux.lieux[2].tags.description !== "undefined") {
                description3 = lieux.lieux[2].tags.description
            }
            site3 = {
                id: '3',
                titre: name3,
                img: '',
                adresse: adresseF3,
                description: description3,
                coordonnes: [lieux.lieux[2].lat, lieux.lieux[2].lon],
                type: this.state.themeId
            }

        }
        let lieuSurprise = this.state.surprise
        if (typeof lieux.surprise !== "undefined") {
            let adresseSurp = await (await fetch(`http://localhost:8080/proximite-a/api/coordinates/${lieux.surprise.lat}_${lieux.surprise.lon}`)).json();
            let adresseFS = adresseSurp.rue + " " + adresseSurp.codepostal + " " + adresseSurp.ville
            console.log(adresseSurp)
            let nameSurp = 'Pas de titre disponible'
            if (lieux.surprise.tags.name) {
                nameSurp = lieux.surprise.tags.name
            }
            let descriptionS = "Pas de description disponible"
            if (typeof lieux.surprise.tags.description !== "undefined") {
                descriptionS = lieux.surprise.tags.description
            }
            lieuSurprise = {
                titre: nameSurp,
                img: '',
                adresse: adresseFS,
                description: descriptionS,
                coordonnes: [lieux.surprise.lat, lieux.surprise.lon],
                type: 0 //todo mettre le bon theme
            }
        }

        this.setState({
            sites: [site1, site2, site3],
            surprise: lieuSurprise
        });
        console.log("nouveaux sites")
        console.log([site1, site2, site3])
        console.log(lieuSurprise)
        this.setState({ pageId: 4 })
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