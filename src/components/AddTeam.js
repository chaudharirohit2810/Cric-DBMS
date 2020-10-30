import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import axios from 'axios'

class AddTeam extends Component {

    constructor() {
        super()
        this.state = {
            modal: false,
            team_name: '',
            logo_link: ''
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
        const body = {
            "team_name": this.state.team_name,
            "logo_link": this.state.logo_link,
        }
        axios.post("http://localhost:5000/teams", body)
        .then(response => {
            alert(`${this.state.team_name} team added`)
        })
        .catch(error => {
            console.log(error)
        })
        this.setState({
            modal: false,
            league_name: '',
            logo_link: '',
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
                                <Col xs="2"><Label>Team Logo: </Label></Col>
                                <Col xs="10"><Input type="name" name="logo_link" id="logo_link" value={this.state.logo_link} onChange={this.handle} placeholder="Paste url of logo"/>   
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