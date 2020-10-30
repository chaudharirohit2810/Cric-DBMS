import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import PlayerDetails from "../PlayerDetails";
import Style from "./league_type.module.scss";

export default function PlayerCard(props) {
    const [player, _] = useState(props.player);
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
                        <span style={{ display: "block", fontWeight: "700" }}>
                            {player.first_name} {player.last_name}
                        </span>
                    </div>
                    <div style={{ marginTop: "5px" }}>
                        Role:
                        <span style={{ display: "block" }}>
                            {player.player_role}
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
                    <PlayerDetails
                        name={`${player.first_name} ${player.last_name}`}
                        photo={player.image_link}
                        player_id={player.player_id}
                    />
                </div>
            </div>
        </Col>
    );
}
