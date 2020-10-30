import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import { Link } from "react-router-dom";
import AddLeague from "./AddLeague";
import axios from "axios";
import Card from "./Utils/LeagueCard";

class LeaguePage extends Component {
    constructor() {
        super();
        this.state = {
            leag: [],
        };
    }

    componentDidMount(props) {
        axios
            .get("http://localhost:5000/league_type/")
            .then((response) => {
                // this.setState({
                //     leag: response.data,
                // });
                // console.log(this.state.leag);
                console.log(response.data);
                this.setState({
                    leag: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const leaguesss = this.state.leag.map((lea, index) => (
            <Card
                id={lea.league_type_id}
                format={lea.league_format}
                name={lea.league_name}
                link={lea.league_logo_link}
            />
        ));

        return (
            <Container>
                <Row>
                    <Col>
                        <div className="titles">Popular Leagues</div>
                    </Col>
                    <Col>
                        <AddLeague />
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
                        {leaguesss}
                    </div>
                </Row>
            </Container>
        );
    }
}

export default LeaguePage;
