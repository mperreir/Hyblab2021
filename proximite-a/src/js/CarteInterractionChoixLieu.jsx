import React from 'react';
import '../css/AcceuilCarte.css'
import logo from '../img/LOGO OK_logo principal.png'
import personnage from '../img/Perso-hyblab-03.png'
import equivalent from './equivalent.js'
class CarteInterractionChoixLieu extends  React.Component {
    state={
        sites:this.props.data.sites,
        selectedSites:[],
        themeId:this.props.data.themeId
    }
    handleCheck = (e) => {
        console.log(e.target)
        let newSelected = this.state.selectedSites
        if (e.target.checked === true && !this.state.selectedSites.includes(this.state.sites[e.target.value])) {
            newSelected.push(this.state.sites[e.target.value-1])
        }
        else if (e.target.checked === false && this.state.selectedSites.includes(this.state.sites[e.target.value])) {
            newSelected.pop(this.state.sites[e.target.value])
        }
        this.setState({ selectedSites: newSelected })
        console.log(this.state.sites[e.target.value-1])
    }

    submitCheck =(update,next) =>{
        console.log(this.state.selectedSites)
        update(this.state.selectedSites)
        next()
    }

    render() {
        const { onNextPhase, onCheckSites} = this.props;
        return (
            <div id="containerInterraction" class="container containersInterraction">
                <div class="row">
                    <div id="containerInterractionLeftSection" class="col-xl-4">
                        <div id="containerInterractionLeftUpperSection">
                            <img src={equivalent.themeLogo.get(this.state.themeId)} id="containerInterractionLogoP1"/>
                        </div>
                        <img src={equivalent.themePerso.get(this.state.themeId)} className="mt-4" width={200}/>
                        <div id="textInterractionIntro">Voyons ce qu’il y a autour de toi ! Voici des lieux qui pourraient t’intéresser. Le(s)quel(s) as-tu envie de visiter ?</div>
                    </div>
                    <div id="containerInterractionRightSection" class="col-xl-8 mt-5">
                        <div class="container mb-5">
                            <div class="row">
                                {this.state.sites.map((e) => {
                                    return <div class="col containerChoice">
                                        <div className="card">
                                            <img className="card-img-top" class="imgChoice" src={e.img} alt="Card image cap" />
                                            <div className="card-body">
                                                <h5 className="card-title">{e.titre}</h5>
                                                <p className="card-text">{e.adresse}</p>
                                                <p className="card-text">{e.description}</p>
                                            </div>
                                        </div>
                                        <input type="checkbox" class="mt-3" value={e.id} name="choixLieux" onChange={this.handleCheck}/>
                                    </div>
                                })}
                            </div>
                        </div>
                        <input type='button' width="50" class="btn btnPurple" value="Valider" onClick={() => { this.submitCheck(onCheckSites,onNextPhase)}}/>
                    </div>
                </div>
            </div>
        );
    }
}
export default CarteInterractionChoixLieu;