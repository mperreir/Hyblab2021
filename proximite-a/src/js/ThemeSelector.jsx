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
            <div id="themeSelector" class="bg-white m-5 d-flex justify-content-center align-items-center flex-column">
                <h3>Tu te sens plutôt .. ?</h3>
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <input type="radio" name="theme" id="fetard" class="input-hidden" />
                            <label htmlFor="fetard">
                                <img src={fetard_img} alt="fetard" class="img_bas"/>
                            </label>
                        </div>

                        <div class="col">
                            <input type="radio" name="theme" id="sportif" class="input-hidden" />
                            <label htmlFor="sportif">
                                <img src={sportif_img} alt="sportif" class="img_hte"/>
                            </label>
                        </div>

                        <div class="col">
                            <input type="radio" name="theme" id="gourmet" class="input-hidden" />
                            <label htmlFor="gourmet">
                                <img src={gourmet_img} alt="gourmet" class="img_bas"/>
                            </label>
                        </div>

                        <div class="col">
                            <input type="radio" name="theme" id="curieux" class="input-hidden" />
                            <label htmlFor="curieux">
                                <img src={curieux_img} alt="curieux" class="img_hte"/>
                            </label>
                        </div>

                        <div class="col">
                            <input type="radio" name="theme" id="famille" class="input-hidden" />
                            <label htmlFor="famille">
                                <img src={famille_img} alt="familley" class="img_bas"/>
                            </label>
                        </div>
                    </div>
                </div>
                <span>fast food - bars - boîtes ....</span>
                <input type='button' class="mb-3" value='VALIDER' onClick={onNextPage} />
            </div>
        );
    }
}

export default ThemeSelector;