import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import axios from 'axios'

class AddRanks extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            league_id: props.conts.league_id,
            team: '',
            team_id: 0,
            points: 0,
            rank: 0,
            
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
            team : event.target.value,
            team_id: event.target[event.target.selectedIndex].id
        })
    }

    handleSubmit = event => {
        const body = {
            "team_id": this.state.team_id,
            "league_id": this.state.league_id,
            "points": this.state.points,
            "ranks": this.state.rank
        }
        axios.post("http://localhost:5000/team_rankings/", body)
        .then(response => {
            this.props.conts.rank_adder()
            alert(`${this.state.team} rank added`)
        })
        .catch(error => {
            console.log(error)
        })
        this.setState({
            modal: false,
            team: '',
            team_id: 0,
            points: 0,
            rank: 0
        })
    }

    compareObjects(object1, object2, key) {
        const obj1 = object1[key].toUpperCase()
        const obj2 = object2[key].toUpperCase()
      
        if (obj1 < obj2) {
          return -1
        }
        if (obj1 > obj2) {
          return 1
        }
        return 0
      }

    

    render() {
        const teams = this.props.conts.teams

        const ops = teams.map(team =>
            <option key={team.team_id} id={team.team_id}>{team.team_name}</option>
        )
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
                                <Col xs="2"><Label>Team: </Label></Col>
                                <Col xs="10"><Input type="select" name="team" id="team" value={this.state.team} onChange={this.handle1} placeholder="Enter team name">
                                    <option>Select Team</option>
                                    {
                                        ops
                                    }
                                    </Input>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Rank: </Label></Col>
                                <Col xs="10"><Input type="number" name="rank" id="rank" value={this.state.rank} onChange={this.handle} placeholder="Enter rank"/></Col>
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