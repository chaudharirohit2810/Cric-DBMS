import React from "react";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import Style from "./league_type.module.scss";

export default function Card(props) {
    return (
        <>
            {/* <Col lg="1"></Col> */}
            <div className={Style.league_type}>
                <div style={{ width: "100%", textAlign: "center" }}>
                    <img
                        src={`${props.link}`}
                        style={{
                            width: "200px",
                            height: "200px",
                        }}
                        alt={`${props.name} logo`}
                    ></img>
                </div>
                <div className={Style.league_type_details}>
                    <div
                        style={{ padding: "32px 24px", paddingBottom: "16px" }}
                    >
                        <div>
                            <span style={{ display: "block" }}>
                                {props.name}
                            </span>
                        </div>
                        <div>
                            Format: <span>{props.format}</span>
                        </div>
                    </div>
                    {/* <div> */}
                    <Link
                        to={{
                            pathname: `/${props.id}`,
                            state: {
                                league_name: props.name,
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
            </div>
            {/* <Col lg="1"></Col> */}
        </>
    );
}
