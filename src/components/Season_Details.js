import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Container, Row, Table } from 'reactstrap'
import AddRanks from './AddRanks'

class Season_Details extends Component {

    constructor(props) {
        super(props)
        this.state = {
            league: props.match.params.league,
            season: props.match.params.season,
            teams: [
                {
                    team: "Mumbai Indians",
                    rank: 1,
                    points: 20,
                },
                {
                    team: "Delhi Capitals",
                    rank: 2,
                    points: 18,
                },
                {
                    team: "Kings XI Punjab",
                    rank: 3,
                    points: 18,
                },
                {
                    team: "Kolkata Knight Riders",
                    rank: 4,
                    points: 16,
                },
                {
                    team: "Sunrisers Hyderabad",
                    rank: 5,
                    points: 14,
                },
                {
                    team: "Chennai Super Kings",
                    rank: 6,
                    points: 10,
                },
            ]
        }
    }

    render() {
        const teams = this.state.teams.map(team =>
            <tr key={team.team}>
                <td>{team.rank}</td>
                <td>{team.team}</td>
                <td>{team.points}</td>
                <td><Link className="btn btn-info" to={`${this.props.match.url}/${team.team}`}>Details</Link> </td>
            </tr>

        )
        return(
            <div className="toplookout">
                <Container>
                    <div className="titles">Details</div>
                    <div className="match">
                        <div>
                            {`League : ${this.state.league}`}
                        </div>
                        <div>
                            {`Season: ${this.state.season}`}
                        </div>
                    </div>
                    <Row>
                        <Col>
                            <div className="titles">Team Rankings</div>
                        </Col>
                        <Col>
                            <AddRanks/>
                        </Col>
                    </Row>
                    
                    <div className="match">
                        <Table hover>
                            <thead>
                                <th>Rank</th>
                                <th>Team Name</th>
                                <th>Points</th>
                                <th></th>
                            </thead>
                            <tbody>
                                {teams}
                            </tbody>
                        </Table>
                    </div>

                </Container>
            </div>
        )
    }
}

export default Season_Details