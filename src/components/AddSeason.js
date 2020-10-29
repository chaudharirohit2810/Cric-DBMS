import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import axios from 'axios'

class AddSeason extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            league_type_id: props.league,
            season: 0,
            startdate: '',
            enddate: '',
            number_of_teams: '',
            country: '',
            winner: '',
            winner_id: 0,
            teams: []
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
            winner: event.target.value,
            winner_id: event.target[event.target.selectedIndex].id
        })
    }

    componentDidMount(props) {
        axios.get(`http://localhost:5000/teams/`)
        .then(response => {
            this.setState({
                teams: response.data
            })
            // console.log(this.state.teams)
        })
    }

    handleSubmit = event => {
        var body = {
            "league_type_id": this.state.league_type_id,
            "startdate": this.state.startdate,
            "enddate": this.state.enddate,
            "number_of_teams": this.state.number_of_teams,
            "country": this.state.country,
            "season": this.state.season,
            "winner": this.state.winner_id
        }
        axios.post("http://localhost:5000/league/", body)
        .then(response => {
            this.props.season_adder()
            alert(`New Season added`)
        })
        .catch(error => {
            console.log(error)
        })
        this.setState({
            modal: false,
            season: 0,
            startdate: '',
            enddate: '',
            number_of_teams: '',
            country: '',
            winner: '',
            winner_id: 0,
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

        const { teams } = this.state
        
        teams.sort((a, b) => {
            return this.compareObjects(a, b, 'team_name')
        })
        

        const ops = teams.map(team =>
            <option key={team.team_id} id={team.team_id}>{team.team_name}</option>
        )

       
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
                                <Col xs="10"><Input type="date" name="startdate" id="startdate" value={this.state.startdate} onChange={this.handle} placeholder="Enter Start Date"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>End: </Label></Col>
                                <Col xs="10"><Input type="date" name="enddate" id="enddate" value={this.state.enddate} onChange={this.handle} placeholder="Enter End Date"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Teams: </Label></Col>
                                <Col xs="10"><Input type="number" name="number_of_teams" id="number_of_teams" value={this.state.number_of_teams} onChange={this.handle} placeholder="Enter number of teams"/></Col>
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
                                <Col xs="10"><Input type="select" name="winner" id="winner" value={this.state.winner} onChange={this.handle1} placeholder="Enter the winner">
                                <option>Choose winner from dropdown</option>
                                {
                                  ops  
                                }
                                    </Input></Col>
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