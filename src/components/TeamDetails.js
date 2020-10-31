import React, {Component} from 'react'
import { Col, Container, Row } from 'reactstrap'
import AddPlayerStats from './AddPlayerStats'
import PlayerDetails from './PlayerDetails'
import axios from 'axios'

class TeamDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            league: props.match.params.league,
            season: props.match.params.season,
            team: props.match.params.team,
            league_type_id: props.location.state.league_type_id,
            league_id: props.location.state.league_id,
            team_id: props.location.state.team_id,
            team_logo_link: props.location.state.team_logo,
            players: [],
            player_added: true,
        }
    }

    componentDidMount(props) {
        axios.get(`http://localhost:5000/players/${this.state.team_id}`)
        .then(response => {
            this.setState({
                players: response.data
            })
        })
        .catch(error => {
            console.log(error)
        })
    
    }

    componentDidUpdate(PrevProps, PrevState) {
        if(PrevState.player_added != this.state.player_added) {
            axios.get(`http://localhost:5000/players/${this.state.team_id}`)
            .then(response => {
                this.setState({
                    players: response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    player_adder = () => {
        this.setState({
            player_added: !this.state.player_added
        })
    }

    render() {
        const players = this.state.players.map((player, index) =>
                <React.Fragment key={player[0].player_id}>
                <Col lg="4" style={{"marginBottom": "10px"}}>
                    <Row>
                        <Col lg="1"></Col>
                            <Col lg="10" className="match">
                                <div style ={{"text-align": "center"}}>
                                    <img src={player[0].image_link} alt="player photo" style={{"height": "150px"}}></img>
                                </div>
                                <div style ={{"text-align": "center"}}>
                                    {`Name: ${player[0].first_name} ${player[0].last_name}`} 
                                </div>
                                <div style ={{"text-align": "center"}}>
                                    {`Age: ${player[0].age}`}
                                </div>
                                <div style ={{"text-align": "center"}}>
                                    {`Role: ${player[0].player_role}`}
                                </div>
                                <PlayerDetails name={`${player[0].first_name} ${player[0].last_name}`} photo={player[0].image_link} player_id={player[0].player_id}/>
                            </Col>
                        <Col lg="1"></Col>
                    </Row>
                </Col>
                {/* <Col lg="1"></Col> */}
                </React.Fragment>
            )
        return(
            <div className="toplookout">
                <Container>
                    <div className="titles">Team Details</div>
                    <div className="match">
                    <Row>
                        <Col lg="4" style={{"textAlign": "center"}}>
                            <img src={this.state.team_logo_link} alt="Team Logo" style={{"height": "70px"}}></img>
                        </Col>
                        <Col lg="8">
                            <div>
                                {`League: ${this.state.league}`}
                            </div>
                            <div>
                                {`Season: ${this.state.season}`}
                            </div>
                            <div>
                                {`Team: ${this.state.team}`}
                            </div>
                        </Col>
                    </Row>
                    </div>
                    <Row>
                        <Col>
                            <div className="titles">Squad</div>
                        </Col>
                        <Col>
                            <AddPlayerStats imps={
                                {
                                    league_id: this.state.league_id,
                                    team_id: this.state.team_id,
                                    player_adder: this.player_adder
                                }
                            }/>
                        </Col>
                    </Row>
                    <Row>
                        {players}
                    </Row>
                </Container>
            </div>
        )
    }
}

export default TeamDetails