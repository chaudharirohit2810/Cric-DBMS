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

class AddLeague extends Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            league_name: "",
            format: "",
        };
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            msg: null,
        });
    };

    handle1 = (event) => {
        this.setState({
            league_name: event.target.value,
        });
    };

    handle2 = (event) => {
        this.setState({
            format: event.target.value,
        });
    };

    handleSubmit = (event) => {
        alert(`${this.state.league_name} match created`);
        this.setState({
            modal: false,
            league_name: "",
            format: "",
        });
    };

    render() {
        return (
            <div>
                <div
                    style={{
                        "text-align": "right",
                        margin: "10px",
                        paddingBlockEnd: "10px",
                    }}
                >
                    <Button color="danger" onClick={this.toggle}>
                        Add League
                    </Button>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader>Add League</ModalHeader>
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
                                            onChange={this.handle1}
                                            placeholder="Enter league name"
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
                                            name="format"
                                            id="format"
                                            value={this.state.format}
                                            onChange={this.handle2}
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
                            Add
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

export default AddLeague;
