import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row, Table } from "reactstrap";
import AddRanks from "./AddRanks";
import axios from "axios";

class Season_Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            league_name: props.match.params.league,
            league_type_id: props.location.state.league_type_id,
            league_id: props.location.state.league_id,
            season: props.match.params.season,
            teams: [],
            teams_available: [],
            rank_added: false,
        };
    }

    componentDidMount(props) {
        axios
            .get(`http://localhost:5000/team_rankings/${this.state.league_id}`)
            .then((response) => {
                this.setState({
                    teams: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get(`http://localhost:5000/teams/`)
            .then((response) => {
                this.setState({
                    teams_available: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidUpdate(PrevProps, PrevState) {
        if (PrevState.rank_added != this.state.rank_added) {
            axios
                .get(
                    `http://localhost:5000/team_rankings/${this.state.league_id}`
                )
                .then((response) => {
                    this.setState({
                        teams: response.data,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    compareObjects(object1, object2, key) {
        const obj1 = object1[key].toUpperCase();
        const obj2 = object2[key].toUpperCase();

        if (obj1 < obj2) {
            return -1;
        }
        if (obj1 > obj2) {
            return 1;
        }
        return 0;
    }

    rank_adder = () => {
        this.setState({
            rank_added: !this.state.rank_added,
        });
    };

    render() {
        const { teams_available } = this.state;

        teams_available.sort((a, b) => {
            return this.compareObjects(a, b, "team_name");
        });

        const teams = this.state.teams.map((team, index) => (
            <tr key={team.team[0].team_id}>
                <td>{index + 1}</td>
                <td>{team.team[0].team_name}</td>
                <td>{team.points}</td>
                <td>
                    <Link
                        className="btn btn-info"
                        to={{
                            pathname: `${this.props.match.url}/${team.team[0].team_name}`,
                            state: {
                                team_id: team.team[0].team_id,
                                league_id: this.state.league_id,
                                league_type_id: this.state.league_type_id,
                                team_logo: team.team[0].logo_link,
                            },
                        }}
                    >
                        Details
                    </Link>{" "}
                </td>
            </tr>
        ));
        return (
            <div className="toplookout">
                <Container>
                    <div
                        style={{
                            background: "rgba(0, 131, 141, 0.2)",
                            color: "#055d63",
                            padding: "18px 24px",
                            borderRadius: "5px",
                        }}
                    >
                        <h3 style={{ fontWeight: "700" }}>Details</h3>
                        {/* <div className="match"> */}
                        <div
                            style={{
                                marginTop: "0px",
                            }}
                        >
                            <div
                                style={{ fontWeight: "700" }}
                            >{`League : ${this.state.league_name}`}</div>
                            <div
                                style={{ fontWeight: "700" }}
                            >{`Season: ${this.state.season}`}</div>
                        </div>
                    </div>
                    <Row>
                        <Col>
                            <div className="titles">Team Rankings</div>
                        </Col>
                        <Col>
                            <AddRanks
                                conts={{
                                    league_id: this.state.league_id,
                                    teams: teams_available,
                                    rank_adder: this.rank_adder,
                                }}
                            />
                        </Col>
                    </Row>

                    {/* <div className="match"> */}
                    <Table hover style={{ border: "1px solid #00838d" }}>
                        <thead
                            style={{
                                backgroundColor: "#00838d",
                                color: "#fff",
                            }}
                        >
                            <th>Rank</th>
                            <th>Team Name</th>
                            <th>Points</th>
                            <th></th>
                        </thead>
                        <tbody>{teams}</tbody>
                    </Table>
                    {/* </div> */}
                </Container>
            </div>
        );
    }
}

export default Season_Details;
