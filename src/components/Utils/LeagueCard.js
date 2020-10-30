import React from "react";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import Style from "./league_type.module.scss";

export default function Card(props) {
    return (
        <>
            {/* <Col lg="1"></Col> */}
            <Col lg="3" className={Style.league_type}>
                <div style={{ width: "100%", textAlign: "center" }}>
                    <img
                        src={`${lea.league_logo_link}`}
                        style={{
                            width: "200px",
                            height: "200px",
                        }}
                        alt={`${lea.league_name} logo`}
                    ></img>
                </div>
                <div className={Style.league_type_details}>
                    <div
                        style={{ padding: "32px 24px", paddingBottom: "16px" }}
                    >
                        <div>
                            <span style={{ display: "block" }}>
                                {lea.league_name}
                            </span>
                        </div>
                        <div>
                            Format: <span>{lea.league_format}</span>
                        </div>
                    </div>
                    {/* <div> */}
                    <Link
                        to={{
                            pathname: `/${lea.league_name}`,
                            state: {
                                league_type_id: lea.league_type_id,
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
                    {/* </div> */}
                </div>
            </Col>
            {/* <Col lg="1"></Col> */}
        </>
    );
}
