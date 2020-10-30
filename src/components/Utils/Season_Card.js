import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import Style from "./season.module.scss";

export default function SeasonCard(props) {
    const [ses, _] = useState(ses);
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
                    pathname: `${props.url}/${ses.league_id}`,
                    state: {
                        league_name: ses.league_name,
                        league_season: ses.season,
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
