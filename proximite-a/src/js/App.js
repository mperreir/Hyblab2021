import React from 'react';
import Home from './Home';
import Theme from './Theme';
import Attributs from './Attributs';
import Moyen from './Moyen';
import AcceuilCarte from './AcceuilCarte';

class App extends  React.Component {

    state = {
        nomPers: "Stépanie",
        pageId:3,
        themeId:1,
        moyenId:0,
        coords:[0,0]
    };

    getPage = () => {
        switch (this.state.pageId) {
            case 0:
                return <Home onNextPage={this.nextPage} updateNom={this.updateName}/>;
            case 1:
                return <Theme onNextPage={this.nextPage} onPreviousPage={this.previousPage}/>;
            case 2:
                return <Attributs onNextPage={this.nextPage} onPreviousPage={this.previousPage}/>;
            case 3:
                return <Moyen onNextPage={this.nextPage} onSetMoyen={this.updateMoyen} onPreviousPage={this.previousPage} />;
            case 4:
                return <AcceuilCarte nomPers={this.state.nomPers}/>;
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
    updateMoyen=(e)=>{
        console.log("nouveau moyen "+e)
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