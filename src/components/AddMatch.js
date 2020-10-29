import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import axios from 'axios'

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
            team1_id: 0,
            team2_id: 0,
            winner_id: 0,
            league_id: 0,
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

    handle1 = event => {
        this.setState({
            team1 : event.target.value,
            team1_id: event.target[event.target.selectedIndex].id
        })
    }

    handle2 = event => {
        this.setState({
            team2 : event.target.value,
            team2_id: event.target[event.target.selectedIndex].id
        })
    }

    handle3 = event => {
        this.setState({
            winner : event.target.value,
            wineer_id: event.target[event.target.selectedIndex].id
        })
    }

    handleSubmit = event => {
        var body = {
            "league_id": this.state.league_id,
            "match_number": this.state.match_no,
            "match_date": this.state.date,
            "team1":this.state.team1_id,
            "team2": this.state.team2_id,
            "winner": this.state.winner_id
        }
        axios.post("http://localhost:5000/matches", body)
        .then(response => {
            alert(`${this.state.team1} vs ${this.state.team2} match created`)
            this.props.match_adder()
        })
        .catch(error => {
            console.log(error)
        })
        this.setState({
            modal: false,
            match_no: 0,
            date: '',
            league: '',
            team1: '',
            team2: '',
            winner: '',
            team1_id: 0,
            team2_id: 0,
            winner_id: 0,
            league_id: 0,
        })
    }

    render() {
        const {teams} = this.props
        const ops = teams.map(team =>
            <option key={team.team_id} id={team.team_id}>{team.team_name}</option>
        )
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
                                <Col xs="10"><Input type="select" name="team1" id="team1" value={this.state.team1} onChange={this.handle1} placeholder="Enter first team">
                                <option>Choose first team</option>
                                {
                                    ops
                                }
                                </Input></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Team2: </Label></Col>
                                <Col xs="10"><Input type="select" name="team2" id="team2" value={this.state.team2} onChange={this.handle2} placeholder="Enter second team">
                                <option>Choose second team</option>
                                {
                                    ops
                                }  
                                    </Input></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Winner: </Label></Col>
                                <Col xs="10"><Input type="select" name="winner" id="winner" value={this.state.winner} onChange={this.handle3} placeholder="Enter winner team">
                                <option>Choose winner</option>
                                {
                                    ops
                                }
                                    </Input></Col>
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