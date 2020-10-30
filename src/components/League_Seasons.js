import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import AddSeason from './AddSeason'
import axios from 'axios'

class League_Seasons extends Component {
    constructor(props) {
        super()
        this.state = {
            league_name: props.location.state.league_name,
            league_type_id: props.match.params.league,
            seas: [],
        }
    }

    componentDidMount(props) {
        axios.get(`http://localhost:5000/league/${this.state.league_type_id}/`)
        .then(response => {
            this.setState({
                seas: response.data
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {

            const season1 = this.state.seas.map((ses, index) =>
            <React.Fragment key={ses.season}>
            <Col lg="6" style={{"marginBottom": "10px"}}>
                <Row>
                    <Col lg="1"></Col>
                        <Col lg="10" className="match">
                            <div style ={{"font-size": "20px", "marginBottom": "10px", "text-align": "center"}}>
                                Season {ses.season}
                            </div>
                            <div style ={{"font-size": "18px", "marginBottom": "10px", "text-align": "center"}}>
                                {`Winner: ${ses.team[0].team_name}`}
                            </div>
                            <Row>
                                <Col>
                                    {`Started: ${ses.startdate.slice(0, 10)}`}
                                </Col>
                                <Col>
                                    {`Ended: ${ses.enddate.slice(0, 10)}`}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {`Host: ${ses.country}`}
                                </Col>
                                <Col >
                                    {`Duration: ${ses.duration} days`}
                                </Col>
                            </Row>
                            

                            <div style ={{"text-align": "center", "marginTop": "15px"}}>
                                <Link className="btn btn-info" to={
                                    {
                                        pathname: `${this.props.match.url}/${ses.league_id}`,
                                        state: {
                                            league_name: this.state.league_name,
                                            league_season: ses.season
                                        }
                                    }
                                    }>Details</Link> 
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
                    <div className="titles">{this.state.league_name} Seasons</div>
                </Col>
                <Col>
                <AddSeason league={this.state.league_type_id}/>
                </Col>
                </Row>
                <Row>
                    {season1}
                </Row>
            </Container>
        )
    }
}

export default League_Seasons