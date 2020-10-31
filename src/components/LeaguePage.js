import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import AddLeague from "./AddLeague";
import axios from "axios";
import Style from "./Utils/league_type.module.scss";
import { Edit, Trash } from "react-feather";
import UpdateLeague from "./UpdateLeague";

class LeaguePage extends Component {
    constructor() {
        super();
        this.state = {
            leag: [],
        };
    }

    fetch_data = () => {
        axios
            .get("http://localhost:5000/league_type/")
            .then((response) => {
                this.setState({
                    leag: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    delete_league_type = (league_id) => {
        axios
            .delete(`http://localhost:5000/league_type/${league_id}`)
            .then((response) => {
                alert("League type deleted successfully");
                this.fetch_data();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    componentDidMount(props) {
        this.fetch_data();
    }

    league_adder = (data) => {
        this.setState({
            leag: [...this.state.leag, data],
        });
    };

    render() {
        const leaguesss = this.state.leag.map((lea, index) => (
            <React.Fragment>
                <div className={Style.league_type}>
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
                            style={{
                                marginTop: "10px",
                                padding: "5px 24px",
                                display: "flex",
                            }}
                        >
                            <UpdateLeague
                                fetch_leagues={this.fetch_data}
                                league={lea}
                            />
                            <Trash
                                size={20}
                                style={{
                                    marginTop: "3px",
                                    marginLeft: "10px",
                                    cursor: "pointer",
                                }}
                                onClick={() =>
                                    this.delete_league_type(lea.league_type_id)
                                }
                            />
                        </div>
                        <div
                            style={{
                                padding: "12px 24px 20px",
                            }}
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
                </div>
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
                        <AddLeague league_changer={this.league_adder} />
                    </Col>
                </Row>

                <Row>{leaguesss}</Row>
            </React.Fragment>
        );
    }
}

export default LeaguePage;
