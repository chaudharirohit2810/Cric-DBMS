import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

class AddTeam extends Component {

    constructor() {
        super()
        this.state = {
            modal: false,
            team_name: '',
            player: 0
        }   
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            msg: null
        })
    }

    handle = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = event => {
        alert(`${this.state.team_name} team created`)
        this.setState({
            modal: false,
            league_name: '',
            format: '',
        })
    }

    render() {
  return (
    <div>
            <a className="linkss" onClick={this.toggle}>Team</a>
        
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader>Add Team</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Team: </Label></Col>
                                <Col xs="10"><Input type="name" name="team_name" id="team_name" value={this.state.team_name} onChange={this.handle} placeholder="Enter team name"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Players </Label></Col>
                                <Col xs="10"><Input type="numbers" name="player" id="player" value={this.state.player} onChange={this.handle} placeholder="Choose number of players"/>   
                                </Col>
                            </Row>
                        </FormGroup>

                    </Form>
                </ModalBody>
                <ModalFooter>
                <Button color="success" onClick={this.handleSubmit}>Add</Button>
                <Button color="danger" onClick={this.toggle}>Back</Button>
                </ModalFooter>
            </Modal>
    </div>
  );
    }
}

export default AddTeam;