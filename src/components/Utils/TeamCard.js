import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import Style from "./league_type.module.scss";

export default class TeamCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            team: props.team
        }
    }

    render() {
        const {team} = this.state
    return (
        <Col lg = "3" className={Style.league_type}>
            <div style={{ textAlign: "center" }}>
                <img
                    src={team.logo_link}
                    alt="team photo"
                    style={{
                        width: "200px",
                        height: "200px",
                    }}
                ></img>
            </div>
            <div className={Style.league_type_details}>
                <div style={{ padding: "32px 24px", paddingBottom: "16px" }}>
                    <div>
                        Team: 
                        <span style={{ display: "block", padding: "5px",fontWeight: "700" }}>
                            {team.team_name}
                        </span>
                    </div>
                </div>
                <div
                    style={{
                        backgroundColor: "#00838d",
                        justifySelf: "center",
                        color: "#fff",
                        padding: "0px",
                        textDecoration: "none",
                        width: "100%",
                        textAlign: "center",
                    }}
                >
                    <Link
                        to={{
                            pathname: `Search/${team.team_name}`,
                            state: {
                                team_id: team.team_id,
                                logo_link: team.logo_link
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
            </div>
        </Col>
    );
                }
}
