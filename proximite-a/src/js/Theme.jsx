import React from 'react';
import logo from '../img/LOGO OK_logo principal.png'
import '../css/theme.css'
class Theme extends  React.Component {
    render() {
        const {onNextPage, onPreviousPage} = this.props;
        return (
            <div id="themeContainer" class="d-flex flex-column">
                <img src={logo} width={100} class="mt-2 ml-5"></img>
                <div className="bg-info m-5 d-flex justify-content-center align-items-center flex-column">
                    <h3>Tu est plutot .. ?</h3>
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <input type="radio" name="theme" id="fetard" className="input-hidden"/>
                                <label htmlFor="fetard">
                                    <img src="//placekitten.com/150/150" alt="fetard"/>
                                </label>
                            </div>

                            <div class="col">
                                <input type="radio" name="theme" id="sportif" className="input-hidden"/>
                                <label htmlFor="sportif">
                                    <img src="//placekitten.com/151/151" alt="sportif"/>
                                </label>
                            </div>

                            <div class="col">
                                <input type="radio" name="theme" id="gourmet" className="input-hidden"/>
                                <label htmlFor="gourmet">
                                    <img src="//placekitten.com/147/147" alt="gourmet"/>
                                </label>
                            </div>

                            <div class="col">
                                <input type="radio" name="theme" id="curieux" className="input-hidden"/>
                                <label htmlFor="curieux">
                                    <img src="//placekitten.com/148/148" alt="curieux"/>
                                </label>
                            </div>

                            <div class="col">
                                <input type="radio" name="theme" id="famille" className="input-hidden"/>
                                <label htmlFor="famille">
                                    <img src="//placekitten.com/149/149" alt="familley"/>
                                </label>
                            </div>
                        </div>
                    </div>
                        <span class="m-2 bg-warning p-2">fast food - bars - boîtes ....</span>
                        <input type='button' class="btn btn-primary mb-3" value='Valider' onClick={onPreviousPage}/>
                </div>
                <div>
                    <input type='button' value='←' onClick={onPreviousPage}/>
                    <input type='button' value='→' onClick={onNextPage}/>
                </div>
            </div>
        );
    }
}

export default Theme;