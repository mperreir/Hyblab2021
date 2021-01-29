import React from 'react';
import '../css/AcceuilCarte.css'

class Etiquette extends  React.Component {

    state={
        stateEtiquette:false,
        sites:this.props.data.sites
    };

    render() {
        //const {theme} = props;

        return (
            <div id="containerInterractionEtiquette"
                 onAnimationEnd={() => this.setState({ stateEtiquette: false })}
                 className={ +' '+ this.state.stateEtiquette ? 'decaleDroite containersInterraction card' : 'decaleGauche ' }>
                <img className="card-img-top imgChoice imgChoiceEtiquette" src={this.state.sites[0].img} alt="Card image cap"/>
                <div className="card-body m-2">
                    <h5 className="card-title">{this.state.sites[0].titre}</h5>
                    <p className="card-text">{this.state.sites[0].adresse}</p>
                    <p className="card-text">Some quick example text to build on the TITRE LIEUX
                        and example text to build on the TITRE LIEUX and example text to build
                        on the TITRE LIEUX and example text to build on the TITRE LIEUX and
                        card's content.</p>
                </div>
                <button id="boutEtiquette"
                        className={'fondEtiquetteDefault'}
                    onClick={() => this.setState({ stateEtiquette: !this.state.stateEtiquette })}>
                    <div className={"roundedText"}>1</div>
                </button>
            </div>
        );
    }
}
export default Etiquette;