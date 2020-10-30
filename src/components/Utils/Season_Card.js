import React from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import Style from "./season.module.scss";

export default function SeasonCard(props) {
    return (
        <div className={Style.season_details}>
            <div style={{ padding: "20px" }}>
                <h3
                    style={{
                        marginBottom: "0px",
                        fontWeight: "700",
                        // color: "#00838d",
                    }}
                >
                    Season {props.season}
                </h3>
                <div>
                    <strong>{`Winner: ${props.team[0].team_name}`}</strong>
                </div>
                <br></br>
                <div>{`Started: ${props.startdate.slice(0, 10)}`}</div>
                <div>{`Ended: ${props.enddate.slice(0, 10)}`}</div>

                <div>{`Host: ${props.country}`}</div>
                <div>{`Duration: ${props.duration} days`}</div>
            </div>

            <Link
                to={{
                    pathname: `${props.url}/${props.league_id}`,
                    state: {
                        league_name: props.league_name,
                        league_season: props.season,
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
    );
}
