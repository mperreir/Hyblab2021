import React from 'react';
import logo from '../img/logo_hyblab.png'

class App extends  React.Component {
    render() {
        return (
            <div>
                <img src={logo} alt="Logo"  width="500"/>
                <h1>Welcome to Hyblab</h1>
            </div>
        );
    }
}

export default App;