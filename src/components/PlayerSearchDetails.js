import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Col,
    Row,
} from "reactstrap";
import axios from "axios";

class PlayerSearchDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            name: props.name,
            image_link: props.photo,
            player_id: props.player_id,
            hundreds: props.hundreds,
            fifties: props.fifties,
            matches: props.matches,
            stats: "",
        };
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            msg: null,
        });
    };

    signal = axios.CancelToken.source();

    componentDidMount(props) {
        const url = `http://localhost:5000/player_stats/${this.state.player_id}`;
        axios
            .get(url, {
                cancelToken: this.signal.token,
            })
            .then((response) => {
                if (response.data[0]) {
                    this.setState({
                        stats: response.data[0],
                    });
                }
            })
            .catch((err) => {
                console.log("Error in retrieving the stats");
            });
    }

    render() {
        const { stats } = this.state;
        return (
            <div>
                <div style={{ "text-align": "center", marginTop: "5px" }}>
                    <Button
                        style={{ backgroundColor: "#00838d", border: "0px" }}
                        onClick={this.toggle}
                    >
                        Details
                    </Button>
                </div>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    scrollable="true"
                >
                    <ModalHeader className="titleModal">
                        {this.state.name}
                    </ModalHeader>
                    {this.state.image_link ? (
                        <ModalHeader className="titleModal">
                            <Col sm="auto">
                                <img
                                    style={{ height: "200px" }}
                                    src={this.state.image_link}
                                    alt="player"
                                ></img>
                            </Col>
                            <Col sm="auto"></Col>
                        </ModalHeader>
                    ) : null}

                    <ModalBody>
                        {
                            this.state.matches ?
                            <React.Fragment>
                            <div style={{ "text-align": "center" }}>
                                Matches: {stats.matches_played}
                            </div>
                            <div className="modalfield">Batting Stats</div>
                            <Row>
                                <Col lg="3">Runs:</Col>
                                <Col lg="2">{stats.runs_scored}</Col>
                                <Col lg="1"></Col>
                                <Col lg="3">High Score: </Col>
                                <Col lg="2">{stats.high_score}</Col>
                            </Row>
                            <Row>
                                <Col lg="3">Hundreds:</Col>
                                <Col lg="2">{stats.hundreds}</Col>
                                <Col lg="1"></Col>
                                <Col lg="3">Fifties: </Col>
                                <Col lg="2">{stats.fifties}</Col>
                            </Row>
                            <Row>
                                <Col lg="3">Not Outs:</Col>
                                <Col lg="2">{stats.not_outs}</Col>
                                <Col lg="1"></Col>
                                <Col lg="3">Strike rate:</Col>
                                <Col lg="2">{stats.strike_rate}</Col>
                            </Row>
                            <Row style={{ marginBottom: "20px" }}>
                                <Col lg="3">Ducks:</Col>
                                <Col lg="2">{stats.ducks}</Col>

                                <Col lg="1"></Col>
                                <Col lg="3">Outs:</Col>
                                <Col lg="2">{stats.outs}</Col>
                            </Row>
                            <div className="modalfield">Bowling Stats</div>
                            <Row>
                                <Col lg="3">Overs:</Col>
                                <Col lg="2">{stats.overs}</Col>
                                <Col lg="1"></Col>
                                <Col lg="3">Wickets: </Col>
                                <Col lg="2">{stats.wickets}</Col>
                            </Row>
                            <Row style={{ marginBottom: "20px" }}>
                                <Col lg="3">Economy:</Col>
                                <Col lg="2">{stats.economy}</Col>
                                <Col lg="1"></Col>
                                <Col lg="3">Best:</Col>
                                <Col lg="2">{stats.best_bowling}</Col>
                            </Row>
                            <div className="modalfield">Fielding Stats</div>
                            <Row style={{ marginBottom: "20px" }}>
                                <Col lg="3">Catches:</Col>
                                <Col lg="2">{stats.catches}</Col>
                                <Col lg="1"></Col>
                                <Col lg="3">Runouts:</Col>
                                <Col lg="2">{stats.run_outs}</Col>
                            </Row>
                            </React.Fragment> : <div style={{textAlign: "center"}}>No stats yet</div>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggle}>
                            Back
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default PlayerSearchDetails;
