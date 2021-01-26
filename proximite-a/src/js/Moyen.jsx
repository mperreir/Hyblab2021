import React from 'react';

class Moyen extends  React.Component {
    render() {
        const {onNextPage, onPreviousPage} = this.props;
        return (
            <div>
                <h3>Choisi ton moyen de déplacement</h3>
                <input type='button' value='valider' onClick={onNextPage}/>

                <input type='button' value='←' onClick={onPreviousPage}/>
                <input type='button' value='→' onClick={onNextPage}/>
            </div>
        );
    }
}
export default Moyen;