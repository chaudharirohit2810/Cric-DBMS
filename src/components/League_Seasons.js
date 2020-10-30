import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import AddSeason from "./AddSeason";
import axios from "axios";
import Card from "./Utils/Season_Card";

class League_Seasons extends Component {
    constructor(props) {
        super();
        this.state = {
            league_name: props.location.state.league_name,
            league_type_id: props.match.params.league,
            seas: [],
        };
    }

    componentDidMount(props) {
        axios
            .get(`http://localhost:5000/league/${this.state.league_type_id}/`)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    seas: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const season1 = this.state.seas.map((ses, index) => (
            <React.Fragment key={ses.season}>
                <Card
                    season={ses.season}
                    team={ses.team}
                    startdate={ses.startdate}
                    enddate={ses.enddate}
                    country={ses.country}
                    duration={ses.duration}
                    league_name={this.state.league_name}
                    url={this.props.match.url}
                    league_id={ses.league_id}
                />
                {/* <Col lg="1"></Col> */}
            </React.Fragment>
        ));

        return (
            <Container className="toplookout">
                <Row>
                    <Col>
                        <div className="titles">
                            {this.state.league_name} Seasons
                        </div>
                    </Col>
                    <Col>
                        <AddSeason league={this.state.league_type_id} />
                    </Col>
                </Row>
                <Row>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        {season1}
                    </div>
                </Row>
            </Container>
        );
    }
}

export default League_Seasons;
