import React from 'react';
import logo from '../img/LOGO OK_logo principal.png'
import ThemeSelector from './ThemeSelector'
import '../css/theme.css'
class Theme extends  React.Component {
    render() {
        const {onNextPage, onPreviousPage} = this.props;
        return (
            <div id="themeContainer" class="d-flex flex-column">
                <img src={logo} width={100} class="mt-2 ml-5"></img>
                <ThemeSelector onNextPage={onNextPage}/>
                <input type='button' class="btnNavigation btn btn-primary" id='btnPrevious' value='←' onClick={onPreviousPage}/>
                <input type='button' class="btnNavigation btn btn-primary" id='btnNext' value='→' onClick={onNextPage}/>
            </div>
        );
    }
}

export default Theme;