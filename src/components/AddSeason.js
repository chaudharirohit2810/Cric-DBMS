import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

class AddSeason extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            season: 0,
            start_date: '',
            end_date: '',
            teams: '',
            country: '',
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
        alert(`Season ${this.state.season} of ${this.props.league}`)
        this.setState({
            modal: false,
            season: 0,
            start_date: '',
            end_date: '',
            teams: '',
            country: '',
            winner: '',
            type: '',
        })
    }

    render() {
  return (
    <div>
        <div style={{"text-align": "right", "margin": "10px", "paddingBlockEnd": "10px"}}>
            <Button color="danger" onClick={this.toggle}>Add Season</Button>
        </div>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader>Add Season</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Season: </Label></Col>
                                <Col xs="10"><Input type="number" name="season" id="season" value={this.state.season} onChange={this.handle} placeholder="Enter season number"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Start: </Label></Col>
                                <Col xs="10"><Input type="date" name="start_date" id="start_date" value={this.state.start_date} onChange={this.handle} placeholder="Enter Start Date"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>End: </Label></Col>
                                <Col xs="10"><Input type="date" name="end_date" id="end_date" value={this.state.end_date} onChange={this.handle} placeholder="Enter End Date"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Teams: </Label></Col>
                                <Col xs="10"><Input type="number" name="teams" id="teams" value={this.state.teams} onChange={this.handle} placeholder="Enter number of teams"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Host: </Label></Col>
                                <Col xs="10"><Input type="name" name="country" id="country" value={this.state.country} onChange={this.handle} placeholder="Enter host country name"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Winner: </Label></Col>
                                <Col xs="10"><Input type="name" name="winner" id="winner" value={this.state.winner} onChange={this.handle} placeholder="Enter the winner"/></Col>
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

export default AddSeason;