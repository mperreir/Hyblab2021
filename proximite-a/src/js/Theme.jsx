import React from 'react';
import logo from '../img/LOGO OK_logo principal.png'
import ThemeSelector from './ThemeSelector'
import '../css/theme.css'
class Theme extends  React.Component {
    state={
        themeId: null,
        buttonActivate: false
    }

    handleChange = (e) => {
        this.setState({
            themeId: e,
            buttonActivate: true
        });
    }

    submitTheme = (update, NextPage) => {
        update(this.state.themeId);
        NextPage();
    }

    render() {
        const {onSetTheme,onNextPage, onPreviousPage} = this.props;
        return (
            <div id="themeContainer" class="d-flex flex-column">
                <img src={logo} width={100} class="mt-2 ml-5"/>
                <div class="d-flex h-100 justify-content-between align-items-center">
                    <input type='button' class="btnNavigation m-3 btn btn-primary" id='btnPrevious' value='←' onClick={onPreviousPage}/>
                    <div class="d-flex flex-column justify-content-center align-items-center ">
                        <ThemeSelector onNextPage={onNextPage} updateSelect={this.handleChange}/>
                        <span>fast food - bars - boîtes ....</span>
                        <input type='button' class="mb-3" value='VALIDER' onClick={() => { this.submitTheme(onSetTheme,onNextPage)}} disabled={!this.state.buttonActivate}/>
                    </div>
                    <input type='button' class="btnNavigation m-3 btn btn-primary" id='btnNext' value='→' onClick={() => { this.submitTheme(onSetTheme, onNextPage) }} disabled={!this.state.buttonActivate}/>
                </div>
            </div>
        );
    }
}

export default Theme;