import React from 'react';
import '../css/AcceuilCarte.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import equivalent from './equivalent.js'

class PopupAnnonce extends  React.Component {

    state={
        show: this.props.affiche,
        themeId:this.props.data.themeId
    };
    closeModal(){
        this.setState({show: false})
    };
    openModal(){
        this.setState({show: true})
    };
    render() {
        return (<Modal show={this.state.show}>
            <Modal.Body>
                <div id="containerPopup">
                    <div id="leftSidePopup">
                        <p id="textPopup">J’ai trouvé un lieu surprise pour toi ! Veux-tu le découvrir ?</p>
                        <div className={"w-100 d-flex justify-content-center"}>
                            <Button id="btnPopupOui" onClick={()=>{this.yesClicked()}}>Oui</Button>
                            <Button id="btnPopupNon" onClick={()=>{this.closeModal()}}>Non</Button>

                        </div>
                    </div>
                    <div id="rightSidePopup">
                        <img src={equivalent.themePerso.get(this.state.themeId)} width={120}/>
                    </div>
                </div>
                <input type="button" id="croixPopup" value="x" onClick={()=>{this.closeModal()}}/>
            </Modal.Body>
        </Modal>)
    }

    yesClicked() {
        this.props.valider();
        this.closeModal()
    }
}
export default PopupAnnonce
