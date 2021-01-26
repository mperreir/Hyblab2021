import React from 'react';

class Attributs extends  React.Component {
    render() {
        const {onNextPage, onPreviousPage} = this.props;
        return (
            <div id="attribusContainer2" >
                <div class="d-flex flex-column justify-content-end ">
                <h3>Choisi ton point de départ</h3>
                <input type='button' value='Activer ma géolocalisation'/>
                <label type='button'> Choisir une adresse </label>
                <input type='text' placeholder=''/>
                <input type='button' value='valider' onClick={onNextPage}/>
                <br />
                <br />
                <input type='button' value='←' onClick={onPreviousPage}/>
                <input type='button' value='→' onClick={onNextPage}/>
                </div>
            </div>
        );
    }
}
export default Attributs;