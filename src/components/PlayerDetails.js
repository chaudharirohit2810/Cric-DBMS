import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class PlayerDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            name: props.name,
            hundreds: props.hundreds,
            fifties: props.fifties,
            matches: props.matches,
        }   
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            msg: null
        })
    }

    render() {
        
  return (
    <div>
        <div style={{"text-align": "center", "marginTop": "5px"}}>
            <Button className="btn btn-info" onClick={this.toggle}>Details</Button>
        </div>
            <Modal isOpen={this.state.modal} toggle={this.toggle} scrollable="true">
                <ModalHeader>Player Details</ModalHeader>
                <ModalBody>
                    <div>
                        Name: {this.state.name}
                    </div>
                    <div>
                        Matches: {this.state.matches}
                    </div>
                    <div>
                        Hundreds: {this.state.hundreds}
                    </div>
                    <div>
                        Fifties: {this.state.fifties}
                    </div>
                </ModalBody>
                <ModalFooter>
                <Button color="danger" onClick={this.toggle}>Back</Button>
                </ModalFooter>
            </Modal>
    </div>
  );
    }
}

export default PlayerDetails;