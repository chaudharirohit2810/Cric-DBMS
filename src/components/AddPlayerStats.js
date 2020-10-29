import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import axios from 'axios'

class AddPlayerStats extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            players: [],
            league_id: props.imps.league_id,
            team_id: props.imps.team_id,
            player: '',
            player_id: 0,
            matches_played: 0,
            runs_scored: 0,
            hundreds: 0,
            fifties: 0,
            high_score: 0,
            not_outs: 0,
            strike_rate: 0,
            overs: 0,
            wickets: 0,
            economy: 0.0,
            best_bowling: '',
            catches: 0,
            runouts: 0,
            ducks: 0,
            outs: 0,
        }   
    }

    componentDidMount(props) {
        axios.get(`http://localhost:5000/players/`)
        .then(response => {
            this.setState({
                players: response.data
            })
        })
        .catch(error => {
            console.log(error)
        })
        console.log(`${this.state.league_id} and for team ${this.state.team_id}` )
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
            player : event.target.value,
            player_id: event.target[event.target.selectedIndex].id
        })
    }

    handleSubmit = event => {
        const body = {
            "player_id": this.state.player_id,
            "league_id": this.state.league_id,
            "matches_played": this.state.matches_played,
            "runs_scored": this.state.runs_scored,
            "hundreds": this.state.hundreds,
            "fifties": this.state.fifties,
            "high_score": this.state.high_score,
            "not_outs": this.state.not_outs,
            "strike_rate": this.state.strike_rate,
            "overs": this.state.overs,
            "wickets": this.state.wickets,
            "economy": this.state.economy,
            "best_bowling": this.state.best_bowling,
            "catches": this.state.catches,
            "run_outs": this.state.runouts,
            "ducks": this.state.ducks,
            "outs": this.state.outs
        }
        axios.post("http://localhost:5000/player_stats/", body)
        .then(response => {
            alert(`Stats added successfully`)
            this.props.imps.player_adder()
        })
        .catch(error => {
            console.log(error)
        })
        axios.post("http://localhost:5000/plays/", {
            "team_id": this.state.team_id,
            "player_id": this.state.player_id,
            "league_id": this.state.league_id
        })
        .then(response => {
            console.log('Plays added successfully')
        })
        .catch(error => {
            console.log(error)
        })
        this.setState({
            modal: false,
            player: '',
            matches_played: '',
            player_id: this.state.players[0].player_id,
            runs_scored: '',
            hundreds: '',
            fifties: '',
            high_score: '',
            not_outs: '',
            strike_rate: '',
            overs: '',
            wickets: '',
            economy: '',
            best_bowling: '',
            catches: '',
            runouts: '',
            ducks: '',
            outs: '',
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
        const {players} = this.state

        players.sort((a, b) => {
            return this.compareObjects(a, b, 'first_name')
        })

        const ops = players.map(player =>
            <option key={player.player_id} id={player.player_id}>{`${player.first_name} ${player.last_name}`}</option>
        )
  return (
    <div>
        <div style={{"text-align": "right", "margin": "10px", "paddingBlockEnd": "10px"}}>
            <Button color="danger" onClick={this.toggle}>Add Player</Button>
        </div>
            <Modal isOpen={this.state.modal} toggle={this.toggle} scrollable="true">
                <ModalHeader>Add Player Stats</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Player: </Label></Col>
                                <Col xs="10"><Input type="select" name="player" id="player" value={this.state.player} onChange={this.handle1} placeholder="Select player">
                                    <option>Select player</option>
                                    {
                                        ops
                                    }
                                </Input></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Matches: </Label></Col>
                                <Col xs="10"><Input type="number" name="matches_played" id="matches_played" value={this.state.match_played} onChange={this.handle} placeholder="Enter matches played"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Runs: </Label></Col>
                                <Col xs="10"><Input type="number" name="runs_scored" id="runs_scored" value={this.state.runs_scored} onChange={this.handle} placeholder="Enter runs scored"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Hundreds: </Label></Col>
                                <Col xs="10"><Input type="number" name="hundreds" id="hundreds" value={this.state.hundreds} onChange={this.handle} placeholder="Enter Hundreds"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Fifties: </Label></Col>
                                <Col xs="10"><Input type="number" name="fifties" id="fifties" value={this.state.fifties} onChange={this.handle} placeholder="Enter Fifties"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>High Score: </Label></Col>
                                <Col xs="10"><Input type="number" name="high_score" id="high_score" value={this.state.high_score} onChange={this.handle} placeholder="Enter high score"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Not Outs: </Label></Col>
                                <Col xs="10"><Input type="number" name="not_outs" id="not_outs" value={this.state.not_outs} onChange={this.handle} placeholder="Enter not outs"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Strike Rate: </Label></Col>
                                <Col xs="10"><Input type="number" name="strike_rate" id="strike_rate" value={this.state.strike_rate} onChange={this.handle} placeholder="Enter Strike Rate"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Overs: </Label></Col>
                                <Col xs="10"><Input type="number" name="overs" id="overs" value={this.state.overs} onChange={this.handle} placeholder="Enter overs delivered"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Wickets: </Label></Col>
                                <Col xs="10"><Input type="number" name="wickets" id="wickets" value={this.state.wickets} onChange={this.handle} placeholder="Enter wickets taken"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Economy: </Label></Col>
                                <Col xs="10"><Input type="number" name="economy" id="economy" value={this.state.economy} onChange={this.handle} placeholder="Enter economy"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Best Bowling: </Label></Col>
                                <Col xs="10"><Input type="name" name="best_bowling" id="best_bowling" value={this.state.best_bowling} onChange={this.handle} placeholder="Bowling figures in R/W format"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Catches: </Label></Col>
                                <Col xs="10"><Input type="number" name="catches" id="catches" value={this.state.catches} onChange={this.handle} placeholder="Enter catches taken"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Runouts: </Label></Col>
                                <Col xs="10"><Input type="number" name="runouts" id="runouts" value={this.state.runouts} onChange={this.handle} placeholder="Enter runouts"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Ducks: </Label></Col>
                                <Col xs="10"><Input type="number" name="ducks" id="ducks" value={this.state.match_played} onChange={this.handle} placeholder="Enter number of ducks"/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="2"><Label>Outs: </Label></Col>
                                <Col xs="10"><Input type="number" name="outs" id="outs" value={this.state.outs} onChange={this.handle} placeholder="Enter number of outs"/></Col>
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

export default AddPlayerStats;