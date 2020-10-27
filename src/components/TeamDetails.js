import React, {Component} from 'react'
import { Col, Container, Row } from 'reactstrap'
import AddPlayer from './AddPlayer'
import AddPlayerStats from './AddPlayerStats'
import AddRanks from './AddRanks'
import PlayerDetails from './PlayerDetails'

class TeamDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            league: props.match.params.league,
            season: props.match.params.season,
            team: props.match.params.team,
            players: [
                {
                    name: "Rohit Sharma",
                    runs: 300,
                    matches: 10,
                    hundreds: 2,
                    fifties: 1
                },
                {
                    name: "MS Dhoni",
                    runs: 420,
                    matches: 10,
                    hundreds: 3,
                    fifties: 2
                },
                {
                    name: "Virat Kohli",
                    runs: 720,
                    matches: 10,
                    hundreds: 5,
                    fifties: 3
                },
                {
                    name: "KL Rahul",
                    runs: 390,
                    matches: 10,
                    hundreds: 2,
                    fifties: 2
                },
                
            ]
        }
    }

    render() {
        const players = this.state.players.map((player, index) =>
                <React.Fragment key={player.name}>
                <Col lg="4" style={{"marginBottom": "10px"}}>
                    <Row>
                        <Col lg="1"></Col>
                            <Col lg="10" className="match">
                                <div style ={{"text-align": "center"}}>
                                    Name: {player.name}
                                </div>
                                <div style ={{"text-align": "center"}}>
                                    {`Matches Played: ${player.matches}`}
                                </div>
                                <div style ={{"text-align": "center"}}>
                                    {`Hundreds: ${player.hundreds}`}
                                </div>
                                <div style ={{"text-align": "center"}}>
                                    {`Fifties: ${player.fifties}`}
                                </div>
                                <PlayerDetails name={player.name} matches={player.hundreds} hundreds={player.hundreds} fifties={player.fifties}/>
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
                    <div>
                        {`League: ${this.state.league}`}
                    </div>
                    <div>
                        {`Season: ${this.state.season}`}
                    </div>
                    <div>
                        {`Team: ${this.state.team}`}
                    </div>
                    </div>
                    <Row>
                        <Col>
                            <div className="titles">Squad</div>
                        </Col>
                        <Col>
                            <AddPlayerStats/>
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