import React, {Component} from 'react'
import { Button, Col, Container, CustomInput, Form, FormGroup, Input, Row } from 'reactstrap'
import axios from 'axios'
import PlayerCard1 from './components/Utils/PlayerCard1'
import TeamCard from './components/Utils/TeamCard'

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entry: '',
            players: [],
            teams: [],
            is_team: true,
            is_player: true,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        
        if(prevState.entry !== this.state.entry || prevState.is_player !== this.state.is_player || prevState.is_team !== this.state.is_team) {
            if(this.state.is_player) {
                const params = {
                    name: this.state.entry
                }
                axios.get(`http://localhost:5000/players/find/`,  {params: params})
                .then((response) => {
                    this.setState({
                        players: response.data
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
            }
            if(this.state.is_team) {
                const params = {
                    name: this.state.entry
                }
                axios.get(`http://localhost:5000/teams/find/`,  {params: params})
                .then((response) => {
                    this.setState({
                        teams: response.data
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        }
    }

    applyfilter = (buttonname, e) => {
        if(buttonname === "players")
          this.setState({
              is_player: e.target.checked
          })
        else
          this.setState({
              is_team: e.target.checked
          })  
        }

    render() {
        const {players, teams} = this.state

        const players_info = players.map((player, index) => (
            <React.Fragment key={player.player_id}>
                <PlayerCard1 player={player} />
                {/* <Col lg="1"></Col> */}
            </React.Fragment>
        ));

        const team_info = teams.map((team) => (
            <React.Fragment key={team.team_id}>
                <TeamCard team={team} />
            </React.Fragment>
        ))

        return(
            <Container className="toplookout">
                <Form>
                    <FormGroup>
                        <Row>
                            <Col lg={2}></Col>
                            <Col lg={7}>
                            <Input type="text" name="text" id="searchquery" placeholder="Search" onChange={(e) => this.setState({entry: e.target.value})}/>
                            </Col>
                            <Col lg={2}>
                                <Button style={{height: '40px'}}>Search</Button>
                            </Col>
                            <Col lg={1}>
                            <Row>
                            <CustomInput type="switch" id="Players" name="customSwitch" label="Players" onChange={(e) => this.applyfilter("players", e)} checked={this.state.is_player}/>
                            </Row>
                            <Row>
                            <CustomInput type="switch" id="Teams" name="customSwitch" label="Teams" onChange={(e) => this.applyfilter("teams", e)} checked={this.state.is_team}/>
                            </Row>
                            </Col>

                        </Row>
                    </FormGroup>
                </Form>
                {this.state.is_player && players_info.length !== 0 &&
                <React.Fragment>
                    <div className="titles">Players</div>
                    <Row style={{"marginTop": "30px"}}>
                        {
                            players_info
                        }
                    </Row>
                </React.Fragment>
                }
                {this.state.is_team && team_info.length !== 0 &&
                <React.Fragment>
                    <div className="titles">Teams</div>
                    <Row style={{"marginTop": "30px"}}>
                        {
                            team_info
                        }
                    </Row>
                </React.Fragment>
                }
                
            </Container>
        )
    }
}

export default Search