import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

class AddRanks extends Component {

    constructor() {
        super()
        this.state = {
            modal: false,
            rank: 0,
            team: '',
            points: 0,
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
        alert(`${this.state.team} rank added`)
        this.setState({
            modal: false,
            rank: 0,
            team: '',
            points: 0,
        })
    }

    render() {
  return (
    <div>
        <div style={{"text-align": "right", "margin": "10px", "paddingBlockEnd": "10px"}}>
            <Button color="danger" onClick={this.toggle}>Add Ranks</Button>
        </div>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader>Add Rank</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Rank: </Label></Col>
                                <Col xs="10"><Input type="number" name="rank" id="rank" value={this.state.rank} onChange={this.handle} placeholder="Enter rank"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Team: </Label></Col>
                                <Col xs="10"><Input type="name" name="team" id="team" value={this.state.team} onChange={this.handle} placeholder="Enter team name"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Points: </Label></Col>
                                <Col xs="10"><Input type="number" name="points" id="points" value={this.state.points} onChange={this.handle} placeholder="Enter points"/></Col>
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

export default AddRanks;