import React from 'react';
import Home from './Home';
import Theme from './Theme';
import Attributs from './Attributs';
import Moyen from './Moyen';
import AcceuilCarte from './AcceuilCarte';

class App extends  React.Component {

    state = {
        nomPers: null,
        pageId:0,
        themeId:0,
        moyenId:0,
        coords:[0,0],
        adresse:'',
        sites: [{ id: '1', titre: 'squalala', img: 'https://pbs.twimg.com/profile_images/743774363833503744/-eSLwh6f_400x400.jpg', adresse: 'nous sommes partis'},
            { id: '2', titre: 'squelele', img: 'https://image.jeuxvideo.com/medias-sm/145554/1455543880-3365-photo.png', adresse: 'nous sommes repartis' },
            { id: '3', titre: 'lelele', img:'https://i.redd.it/izua8frednh41.png',adresse:'AAAAAAAAAAAAAHH'}]
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
                return <AcceuilCarte data={this.state} nomPers={this.state.nomPers}/>;
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
