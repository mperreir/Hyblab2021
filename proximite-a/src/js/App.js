import React from 'react';
import Home from './Home';
import Theme from './Theme';
import Attributs from './Attributs';
import Moyen from './Moyen';
import AcceuilCarte from './AcceuilCarte';

class App extends  React.Component {

    state = {
        nomPers: null,
        pageId: 0,
        themeId:0,
        moyenId:0,
        coords:[0,0],
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
            coordonnes:[0,0]    //latitude_longitude
        },
            { id: '2',
                titre: 'squelele',
                img: 'https://media.tenor.com/images/1c500d0d30c039aef2cc1056a0f4e8e6/tenor.gif',
                adresse: 'nous sommes repartis',
                description : "blabla",
                coordonnes:[0,0]    //latitude_longitude
            },
            { id: '3',
                titre: 'Oooo di',
                img:'https://media.tenor.com/images/5c58bbed210c8bb91dddb88caa8f1ed3/tenor.gif',
                adresse:'AAAAAAAAAAAAAHH',
                description : "blabla",
                coordonnes:[0,0]    //latitude_longitude
            }]
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
    };

    updateMoyen=(e)=>{
        this.setState({moyenId:e})
    };

    render() {
        return (
            <div id="mainContainer">
                {this.getPage()}
            </div>
        );
    }
}

export default App;
