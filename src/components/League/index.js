import React, { Component } from "react";
import { Col, Row, Button } from "reactstrap";
import AddLeague from "./AddLeague";
import League_Seasons from "./League_Seasons";
import Style from "./league.module.scss";

class LeaguePage extends Component {
    constructor() {
        super();
        this.state = {
            leagues: [
                {
                    League_name: "Indian Premier League",
                    Format: "T20",
                    Description: "League Played in India",
                },
                {
                    League_name: "Big Bash League",
                    Format: "T20",
                    Description: "League Played in Australia",
                },
                {
                    League_name: "Caribbean Premier League",
                    Format: "T20",
                    Description: "League Played in Caribbean Islands",
                },
                {
                    League_name: "ODI World Cup",
                    Format: "ODI",
                    Description: "League Played All over the world",
                },
                {
                    League_name: "Champions Trophy",
                    Format: "ODI",
                    Description: "League Played All over the world",
                },
                {
                    League_name: "T20 World Cup",
                    Format: "T20",
                    Description: "League Played all over the world",
                },
            ],
        };
    }

    render() {
        const leaguess = this.state.leagues.map((lea, index) => (
            <React.Fragment>
                <Col lg="6" style={{ marginBottom: "10px" }}>
                    <Row>
                        <Col lg="1"></Col>
                        <Col lg="10" className={Style.league}>
                            <div style={{ "text-align": "center" }}>logo</div>
                            <div style={{ "text-align": "center" }}>
                                {`League Name: ${lea.League_name}`}
                            </div>
                            <div style={{ "text-align": "center" }}>
                                {`League Format: ${lea.Format}`}
                            </div>

                            <div style={{ "text-align": "center" }}>
                                {/* <Router>
                                        <Link to="/Season">Browse</Link>
                                        <Switch>
                                            <Route path="/Season">
                                                <League_Seasons/>
                                            </Route>
                                        </Switch>
                                    </Router> */}
                            </div>
                        </Col>
                        <Col lg="1"></Col>
                    </Row>
                </Col>
                {/* <Col lg="1"></Col> */}
            </React.Fragment>
        ));

        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <div className="titles">Popular Leagues</div>
                    </Col>
                    <Col>
                        <AddLeague />
                    </Col>
                </Row>

                <Row>{leaguess}</Row>
            </React.Fragment>
        );
    }
}

export default LeaguePage;
