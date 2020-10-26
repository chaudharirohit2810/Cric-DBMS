import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

class AddPlayer extends Component {

    constructor() {
        super()
        this.state = {
            modal: false,
            first_name: '',
            last_name: '',
            age: '',
            start: '',
            role: '',
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
        alert(`${this.state.first_name} ${this.state.last_name} player added`)
        this.setState({
            modal: false,
            first_name: '',
            last_name: '',
            age: '',
            start: '',
            role: '',
        })
    }

    render() {
  return (
    <div>
        <a className="linkss" onClick={this.toggle}>Player</a>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader>Add Player</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>First Name: </Label></Col>
                                <Col xs="10"><Input type="name" name="first_name" id="first_name" value={this.state.first_name} onChange={this.handle} placeholder="Enter first name"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Last Name: </Label></Col>
                                <Col xs="10"><Input type="name" name="last_name" id="last_name" value={this.state.last_name} onChange={this.handle} placeholder="Enter last name"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Age: </Label></Col>
                                <Col xs="10"><Input type="number" name="age" id="age" value={this.state.age} onChange={this.handle} placeholder="Enter age"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Start: </Label></Col>
                                <Col xs="10"><Input type="date" name="start" id="start" value={this.state.start} onChange={this.handle} placeholder="Enter career start date"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Role: </Label></Col>
                                <Col xs="10"><Input type="select" name="role" id="role" value={this.state.role} onChange={this.handle} placeholder="Choose player's role">
                                <option>Batsman</option>
                                <option>Bowler</option>
                                <option>All Rounder</option>
                                <option>Wicket Keeper</option>
                                 </Input>   
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

export default AddPlayer;