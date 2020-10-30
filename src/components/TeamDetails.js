import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import AddPlayerStats from "./AddPlayerStats";
import PlayerDetails from "./PlayerDetails";
import axios from "axios";
import PlayerCard from "./Utils/PlayerCard";

class TeamDetails extends Component {
    constructor(props) {
        super(props);
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
        };
    }

    componentDidMount(props) {
        const body = {
            team_id: this.state.team_id,
            league_id: this.state.league_id
        }
        axios.get(`http://localhost:5000/plays/`, {params: body})
            .then((response) => {
                this.setState({
                    players: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidUpdate(PrevProps, PrevState) {
        if (PrevState.player_added != this.state.player_added) {
            const body = {
                team_id: this.state.team_id,
                league_id: this.state.league_id
            }
            axios
                .get(`http://localhost:5000/plays/`, {params: body})
                .then((response) => {
                    this.setState({
                        players: response.data,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    player_adder = () => {
        this.setState({
            player_added: !this.state.player_added,
        });
    };

    render() {
        const players = this.state.players.map((player, index) => (
            <React.Fragment key={player.player_id}>
                <PlayerCard player={player} />
                {/* <Col lg="1"></Col> */}
            </React.Fragment>
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
                        {/* <h3>Team Details</h3> */}
                        <Row>
                            <Col lg="4">
                                <img
                                    src={this.state.team_logo_link}
                                    alt="Team Logo"
                                    style={{ height: "120px" }}
                                ></img>
                            </Col>
                            <Col
                                lg="8"
                                style={{ marginTop: "20px", fontWeight: "700" }}
                            >
                                <div>{`League: ${this.state.league}`}</div>
                                <div>{`Season: ${this.state.season}`}</div>
                                <div>{`Team: ${this.state.team}`}</div>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col>
                            <div className="titles">Squad</div>
                        </Col>
                        <Col>
                            <AddPlayerStats
                                imps={{
                                    league_id: this.state.league_id,
                                    team_id: this.state.team_id,
                                    player_adder: this.player_adder,
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>{players}</Row>
                </Container>
            </div>
        );
    }
}

export default TeamDetails;
