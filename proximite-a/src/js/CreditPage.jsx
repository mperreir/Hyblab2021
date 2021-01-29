import React from 'react'
import exit from '../img/Ellipse 42.png'
import logo from '../img/LOGO OK_logo principal.png'
import '../css/creditPage.css'
import logohyblab from '../img/logo_hyblab.png'
import {useState} from 'react'

class CereditPage extends React.Component{
    render(){
        return(
            
            <div class="dimention">
             
                <div class="cadrcredit">
                    <input id="exitposition" value="X" type='button'/>
                    <img id="logoposition" src={logo} alt="logo" />
                    <p id="textposition"> Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.</p>
                    <br /><br/><br/>
                    <div class="logosposition">
                

                    </div>
                    
                </div>

            </div>




        )
    };
}

export default CereditPage;