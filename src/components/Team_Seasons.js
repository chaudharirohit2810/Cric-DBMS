import React, {Component} from 'react'
import axios from 'axios'
import { Col, Container, Row } from 'reactstrap'
import Style from "./Utils/season.module.scss";
import { Link } from 'react-router-dom';

class Team_Seasons extends Component {
    
    constructor(props) {
        super(props) 
        this.state = {
            seasons: [],
            team_id: props.location.state.team_id,
            team_logo_link: props.location.state.logo_link,
            team_name: props.match.params.team_name
        }
    }

    componentDidMount(props) {
        axios.get(`http://localhost:5000/league/league_seasons/${this.state.team_id}`)
        .then((response) => {
            this.setState({
                seasons: response.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {

        const league = this.state.seasons.map(indi => (
            <React.Fragment key={indi.league_id}>
                <div className={Style.season_details}>
                    <div style={{ padding: "20px" }}>
                        <h3
                            style={{
                                marginBottom: "0px",
                                fontWeight: "700",
                                // color: "#00838d",
                            }}
                        >
                            {indi.league_name}
                        </h3>
                        <div>
                            <strong>{`Season: ${indi.season}`}</strong>
                        </div>
                        <br></br>
                        <div>{`Rank: ${indi.ranks}`}</div>

                        <div>{`Points: ${indi.points}`}</div>
                        <div>{`Format: ${indi.league_format}`}</div>
                    </div>

                    <Link
                    
                        to={{
                            pathname: `/${indi.league_name}/${indi.season}/${this.state.team_name}`,
                            state: {
                                team_id: this.state.team_id,
                                league_id: indi.league_id,
                                league_type_id: indi.league_type_id,
                                team_logo: this.state.team_logo_link,
                            },
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: "#00838d",
                                justifySelf: "center",
                                color: "#fff",
                                padding: "10px",
                                textDecoration: "none",
                                width: "100%",
                                textAlign: "center",
                            }}
                        >
                            Details
                        </div>
                    </Link>
                </div>

                {/* <Col lg="1"></Col> */}
            </React.Fragment>
        ))
        
        return(
            <Container className="toplookout">
            <Row className="match" style={{"text-align": "center"}}>
                        {/* <h3>Team Details</h3> */}
                        <Col lg={4}></Col>
                        <Col lg={4}>
                            <div> 
                                <img
                                    src={this.state.team_logo_link}
                                    alt="Team Logo"
                                    style={{ height: "120px" }}
                                ></img>
                            </div>
                            <div
                                
                                style={{ marginTop: "20px", fontWeight: "700" }}
                            >
                                <div>{`${this.state.team_name}`}</div>
                            </div>
                        </Col>
                        <Col lg={4}></Col>
                    </Row>
            <Row>
                {
                    league
                }
            </Row>
            </Container>
        )
    }
} 

export default Team_Seasons