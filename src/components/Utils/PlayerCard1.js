import React, { Component, useState } from "react";
import { Col, Row } from "reactstrap";
import PlayerDetails from "../PlayerDetails";
import PlayerSearchDetails from "../PlayerSearchDetails";
import Style from "./league_type.module.scss";

export default class PlayerCard1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            player: props.player
        }
    }

    render() {
        const {player} = this.state
    return (
        <Col lg = "3" className={Style.league_type}>
            <div style={{ textAlign: "center" }}>
                <img
                    src={player.image_link}
                    alt="player photo"
                    style={{
                        width: "200px",
                        height: "200px",
                    }}
                ></img>
            </div>
            <div className={Style.league_type_details}>
                <div style={{ padding: "32px 24px", paddingBottom: "16px" }}>
                    <div>
                        Name: 
                        <span style={{ padding: "5px",fontWeight: "700" }}>
                            {player.first_name} {player.last_name}
                        </span>
                    </div>
                    <div style={{ marginTop: "5px" }}>
                        Role: 
                        <span style={{ padding: "5px"}}>
                            {player.player_role}
                        </span>
                    </div>
                    <div style={{ marginTop: "5px" }}>
                        Age:
                        <span style={{ padding: "5px" }}>
                            {player.age}
                        </span>
                    </div>
                    <div style={{ marginTop: "5px" }}>
                        Career Start:
                        <span style={{ padding: "5px" }}>
                            {player.career_start.slice(0, 10)}
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
                    <PlayerSearchDetails
                        name={`${player.first_name} ${player.last_name}`}
                        photo={player.image_link}
                        player_id={player.player_id}
                    />
                </div>
            </div>
        </Col>
    );
                }
}
