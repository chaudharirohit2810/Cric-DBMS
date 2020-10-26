import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

class AddMatch extends Component {

    constructor() {
        super()
        this.state = {
            modal: false,
            match_no: 0,
            date: '',
            league: '',
            team1: '',
            team2: '',
            winner: '',
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
        alert(`${this.state.team1} vs ${this.state.team2} match created`)
        this.setState({
            modal: false,
            match_no: 0,
            date: '',
            league: '',
            team1: '',
            team2: '',
            winner: '',
        })
    }

    render() {
  return (
    <div>
        <div style={{"text-align": "right", "margin": "10px", "paddingBlockEnd": "10px"}}>
            <Button color="danger" onClick={this.toggle}>Add Match</Button>
        </div>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader>Add Match</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Match: </Label></Col>
                                <Col xs="10"><Input type="number" name="match_no" id="match_no" value={this.state.match_no} onChange={this.handle} placeholder="Enter match number"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>League: </Label></Col>
                                <Col xs="10"><Input type="name" name="league" id="league" value={this.state.league} onChange={this.handle} placeholder="Enter league name"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Team1: </Label></Col>
                                <Col xs="10"><Input type="name" name="team1" id="team1" value={this.state.team1} onChange={this.handle} placeholder="Enter first team"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Team2: </Label></Col>
                                <Col xs="10"><Input type="name" name="team2" id="team2" value={this.state.team2} onChange={this.handle} placeholder="Enter second team"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Winner: </Label></Col>
                                <Col xs="10"><Input type="name" name="winner" id="winner" value={this.state.winner} onChange={this.handle} placeholder="Enter winner team"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Date: </Label></Col>
                                <Col xs="10"><Input type="date" name="date" id="date" value={this.state.date} onChange={this.handle} placeholder="Enter the date"/></Col>
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

export default AddMatch;