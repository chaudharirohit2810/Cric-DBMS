import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
} from "reactstrap";
import axios from "axios";
import { Edit } from "react-feather";

class UpdateLeague extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            modal: false,
            league_name: props.league.league_name,
            league_type_id: props.league.league_type_id,
            league_format: props.league.league_format,
            league_logo_link: props.league.league_logo_link,
        };
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            msg: null,
        });
    };

    handle = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSubmit = (event) => {
        var body = {
            league_name: this.state.league_name,
            league_format: this.state.league_format,
            league_logo_link: this.state.league_logo_link,
        };
        axios
            .put(
                `http://localhost:5000/league_type/${this.state.league_type_id}`,
                body
            )
            .then((response) => {
                this.props.fetch_leagues();
                alert(`Details updated`);
            })
            .catch((error) => {
                console.log(error);
            });
        this.setState({
            modal: false,
            league_name: "",
            league_format: "T20",
            league_logo_link: "",
        });
    };

    render() {
        return (
            <div>
                <div>
                    <Edit
                        size={20}
                        onClick={this.toggle}
                        style={{ cursor: "pointer" }}
                    />
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader>Update League Details</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Row>
                                    <Col xs="2">
                                        <Label>League: </Label>
                                    </Col>
                                    <Col xs="10">
                                        <Input
                                            type="name"
                                            name="league_name"
                                            id="league_name"
                                            value={this.state.league_name}
                                            onChange={this.handle}
                                            placeholder="Enter league name"
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col xs="2">
                                        <Label>League: </Label>
                                    </Col>
                                    <Col xs="10">
                                        <Input
                                            type="name"
                                            name="league_logo_link"
                                            id="league_logo_link"
                                            value={this.state.league_logo_link}
                                            onChange={this.handle}
                                            placeholder="Paste url of the logo"
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col xs="2">
                                        <Label>Format </Label>
                                    </Col>
                                    <Col xs="10">
                                        <Input
                                            type="select"
                                            name="league_format"
                                            id="league_format"
                                            value={this.state.league_format}
                                            onChange={this.handle}
                                            placeholder="Choose format type"
                                        >
                                            <option>T20</option>
                                            <option>ODI</option>
                                            <option>Test</option>
                                        </Input>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.handleSubmit}>
                            Update
                        </Button>
                        <Button color="danger" onClick={this.toggle}>
                            Back
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default UpdateLeague;
