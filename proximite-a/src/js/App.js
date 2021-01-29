import React from 'react';
import Home from './Home';
import Theme from './Theme';
import Attributs from './Attributs';
import Moyen from './Moyen';
import AcceuilCarte from './AcceuilCarte';

class App extends  React.Component {

    state = {
        nomPers: "Stépanie",
        pageId:4,
        themeId:1,
        moyenId:2,
        coords:[0,0]
    };

    getPage = () => {
        switch (this.state.pageId) {
            case 0:
                return <Home onNextPage={this.nextPage}/>;
            case 1:
                return <Theme onNextPage={this.nextPage} onPreviousPage={this.previousPage}/>;
            case 2:
                return <Attributs onNextPage={this.nextPage} onPreviousPage={this.previousPage}/>;
            case 3:
                return <Moyen onNextPage={this.nextPage} onPreviousPage={this.previousPage} />;
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

    render() {
        return (
            <div id="mainContainer">
                {this.getPage()}
            </div>
        );
    }
}

export default App;