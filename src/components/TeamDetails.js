import React, {Component} from 'react'
import { Col, Container, Row } from 'reactstrap'
import AddPlayer from './AddPlayer'
import AddPlayerStats from './AddPlayerStats'
import AddRanks from './AddRanks'

class TeamDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            league: props.match.params.league,
            season: props.match.params.season,
            team: props.match.params.team,
            players: [

            ]
        }
    }

    render() {
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
                </Container>
            </div>
        )
    }
}

export default TeamDetails