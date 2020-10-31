import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import AddSeason from "./AddSeason";
import axios from "axios";
import Style from "./Utils/season.module.scss";

class League_Seasons extends Component {
    constructor(props) {
        super();
        this.state = {
            league_name: props.match.params.league,
            league_type_id: props.location.state.league_type_id,
            seas_added: false,
            seas: [],
        };
    }

    componentDidMount(props) {
        axios
            .get(`http://localhost:5000/league/${this.state.league_type_id}/`)
            .then((response) => {
                this.setState({
                    seas: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidUpdate(PrevProps, PrevState) {
        if (PrevState.seas_added != this.state.seas_added) {
            axios
                .get(
                    `http://localhost:5000/league/${this.state.league_type_id}/`
                )
                .then((response) => {
                    this.setState({
                        seas: response.data,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    season_adder = () => {
        this.setState({
            seas_added: !this.state.seas_added,
        });
    };

    render() {
        const season1 = this.state.seas.map((ses, index) => (
            <React.Fragment key={ses.season}>
                <div className={Style.season_details}>
                    <div style={{ padding: "20px" }}>
                        <h3
                            style={{
                                marginBottom: "0px",
                                fontWeight: "700",
                                // color: "#00838d",
                            }}
                        >
                            Season {ses.season}
                        </h3>
                        <div>
                            <strong>{`Winner: ${ses.team[0].team_name}`}</strong>
                        </div>
                        <br></br>
                        <div>{`Started: ${ses.startdate.slice(0, 10)}`}</div>
                        <div>{`Ended: ${ses.enddate.slice(0, 10)}`}</div>

                        <div>{`Host: ${ses.country}`}</div>
                        <div>{`Duration: ${ses.duration} days`}</div>
                    </div>

                    <Link
                        to={{
                            pathname: `${this.props.match.url}/${ses.season}`,
                            state: {
                                league_id: ses.league_id,
                                league_type_id: this.state.league_type_id,
                            },
                        }}
                        style={{ textDecoration: "none" }}
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
                        <AddSeason
                            league={this.state.league_type_id}
                            season_adder={this.season_adder}
                        />
                    </Col>
                </Row>
                <Row>{season1}</Row>
            </Container>
        );
    }
}

export default League_Seasons;
