import React from 'react';
import logo from '../img/LOGO OK_logo principal.png'
import fetard_img from '../img/Perso-hyblab-03.png'
import sportif_img from '../img/Perso-hyblab-02.png'
import gourmet_img from '../img/Perso-hyblab-04.png'
import curieux_img from '../img/Perso-hyblab-05.png'
import famille_img from '../img/Perso-hyblab-06.png'
import '../css/theme.css'
class ThemeSelector extends React.Component {
    render() {
        const { onNextPage, onPreviousPage } = this.props;
        return (
            <div className="bg-info m-5 d-flex justify-content-center align-items-center flex-column">
                <h3>Tu est plutot .. ?</h3>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <input type="radio" name="theme" id="fetard" className="input-hidden" />
                            <label htmlFor="fetard">
                                <img src={fetard_img} alt="fetard" />
                            </label>
                        </div>

                        <div className="col">
                            <input type="radio" name="theme" id="sportif" className="input-hidden" />
                            <label htmlFor="sportif">
                                <img src={sportif_img} alt="sportif" />
                            </label>
                        </div>

                        <div className="col">
                            <input type="radio" name="theme" id="gourmet" className="input-hidden" />
                            <label htmlFor="gourmet">
                                <img src={gourmet_img} alt="gourmet" />
                            </label>
                        </div>

                        <div className="col">
                            <input type="radio" name="theme" id="curieux" className="input-hidden" />
                            <label htmlFor="curieux">
                                <img src={curieux_img} alt="curieux" />
                            </label>
                        </div>

                        <div className="col">
                            <input type="radio" name="theme" id="famille" className="input-hidden" />
                            <label htmlFor="famille">
                                <img src={famille_img} alt="familley" />
                            </label>
                        </div>
                    </div>
                </div>
                <span className="m-2 bg-warning p-2">fast food - bars - boîtes ....</span>
                <input type='button' className="btn btn-primary mb-3" value='Valider' onClick={onNextPage} />
            </div>
        );
    }
}

export default ThemeSelector;