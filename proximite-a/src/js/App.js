import React from 'react';
import logo from '../img/logo_hyblab.png'
import Home from './Home'
import Theme from './Theme';
class App extends  React.Component {

    state = {
        pageId:0
    }

    getPage = () =>{
        switch (this.state.pageId) {
            case 0:
                return <Home onNextPage={this.nextPage}/>;
            case 1:
                return <Theme onNextPage={this.nextPage} onPreviousPage={this.previousPage}/>;
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
            <div>

                {this.getPage()}
            </div>
        );
    }
}

export default App;