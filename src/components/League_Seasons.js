import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import AddSeason from './AddSeason'

class League_Seasons extends Component {
    constructor(props) {
        super()
        this.state = {
            league: props.match.params.league,
            seasons: [
                {
                    start_date: '21-03-2008',
                    end_date: '21-05-2008',
                    duration: 2,
                    teams: 8,
                    country: "India",
                    season: 1,
                    winner: 'Rajasthan Royals',
                    type: 'T20',
                },
                {
                    start_date: '20-03-2009',
                    end_date: '19-05-2009',
                    duration: 2,
                    teams: 8,
                    country: 'South Africa',
                    season: 2,
                    winner: 'Deccan Chargers',
                    type: 'T20',
                },
                {
                    start_date: '2-04-2010',
                    end_date: '30-05-2010',
                    duration: 2,
                    teams: 8,
                    country: 'India',
                    season: 3,
                    winner: 'Chennai Super Kings',
                    type: 'T20',
                },
            ]
        }
    }

    render() {
        
        const season = this.state.seasons.map((ses, index) =>
                <React.Fragment key={ses.season}>
                <Col lg="6" style={{"marginBottom": "10px"}}>
                    <Row>
                        <Col lg="1"></Col>
                            <Col lg="10" className="match">
                                <div style ={{"text-align": "center"}}>
                                    Season {ses.season}
                                </div>
                                <Row>
                                    <Col style ={{"text-align": "center"}}>
                                        {`Started: ${ses.start_date}`}
                                    </Col>
                                    <Col style ={{"text-align": "center"}}>
                                        {`Ended: ${ses.end_date}`}
                                    </Col>
                                </Row>
                                <div style ={{"text-align": "center"}}>
                                    {`Host: ${ses.country}`}
                                </div>
                                <div style ={{"text-align": "center"}}>
                                    {`Winner: ${ses.winner}`}
                                </div>

                                <div style ={{"text-align": "center", "marginTop": "10px"}}>
                                    <Link className="btn btn-info" to={`${this.props.match.url}/${ses.season}`}>Details</Link> 
                                </div>

                            </Col>
                        <Col lg="1"></Col>
                    </Row>
                </Col>
                {/* <Col lg="1"></Col> */}
                </React.Fragment>
            )

        return(
            <Container className="toplookout">
                <Row>
                <Col>
                <div className="titles">{this.state.league} Seasons</div>
                </Col>
                <Col>
                <AddSeason league={this.state.league}/>
                </Col>
                </Row>
                <Row>
                    {season}
                </Row>
            </Container>
        )
    }
}

export default League_Seasons