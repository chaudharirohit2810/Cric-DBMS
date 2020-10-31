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

class AddSeason extends Component {
    constructor(props) {
        super(props);
        var startdate = new Date(props.league.startdate)
            .toISOString()
            .split("T")[0];
        var endate = new Date(props.league.enddate).toISOString().split("T")[0];

        console.log(startdate);
        this.state = {
            modal: false,
            league_type_id: props.league.league_type_id,
            league_id: props.league.league_id,
            season: props.league.season,
            startdate: startdate,
            enddate: endate,
            number_of_teams: props.league.number_of_teams,
            country: props.league.country,
            winner: props.league.team[0].team_name,
            winner_id: props.league.team[0].team_id,
            teams: [],
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

    handle1 = (event) => {
        this.setState({
            winner: event.target.value,
            winner_id: event.target[event.target.selectedIndex].id,
        });
    };

    componentDidMount(props) {
        axios.get(`http://localhost:5000/teams/`).then((response) => {
            this.setState({
                teams: response.data,
            });
            // console.log(this.state.teams)
        });
    }

    handleSubmit = (event) => {
        var body = {
            league_type_id: this.state.league_type_id,
            startdate: this.state.startdate,
            enddate: this.state.enddate,
            number_of_teams: this.state.number_of_teams,
            country: this.state.country,
            season: this.state.season,
            winner: this.state.winner_id,
        };
        axios
            .put(`http://localhost:5000/league/${this.state.league_id}`, body)
            .then((response) => {
                this.props.fetch_seasons();
                alert(`Season details updated`);
            })
            .catch((error) => {
                console.log(error);
            });
        this.setState({
            modal: false,
        });
        // this.setState({
        //     modal: false,
        //     season: 0,
        //     startdate: "",
        //     enddate: "",
        //     number_of_teams: "",
        //     country: "",
        //     winner: "",
        //     winner_id: 0,
        // });
    };

    compareObjects(object1, object2, key) {
        const obj1 = object1[key].toUpperCase();
        const obj2 = object2[key].toUpperCase();

        if (obj1 < obj2) {
            return -1;
        }
        if (obj1 > obj2) {
            return 1;
        }
        return 0;
    }

    render() {
        const { teams } = this.state;

        teams.sort((a, b) => {
            return this.compareObjects(a, b, "team_name");
        });

        const ops = teams.map((team) => (
            <option key={team.team_id} id={team.team_id}>
                {team.team_name}
            </option>
        ));

        return (
            <div>
                <div>
                    <Edit size={20} onClick={this.toggle} />
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader>Add Season</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Row>
                                    <Col xs="2">
                                        <Label>Season: </Label>
                                    </Col>
                                    <Col xs="10">
                                        <Input
                                            type="number"
                                            name="season"
                                            id="season"
                                            value={this.state.season}
                                            onChange={this.handle}
                                            placeholder="Enter season number"
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col xs="2">
                                        <Label>Start: </Label>
                                    </Col>
                                    <Col xs="10">
                                        <Input
                                            type="date"
                                            name="startdate"
                                            id="startdate"
                                            value={this.state.startdate}
                                            onChange={this.handle}
                                            placeholder="Enter Start Date"
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col xs="2">
                                        <Label>End: </Label>
                                    </Col>
                                    <Col xs="10">
                                        <Input
                                            type="date"
                                            name="enddate"
                                            id="enddate"
                                            value={this.state.enddate}
                                            onChange={this.handle}
                                            placeholder="Enter End Date"
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col xs="2">
                                        <Label>Teams: </Label>
                                    </Col>
                                    <Col xs="10">
                                        <Input
                                            type="number"
                                            name="number_of_teams"
                                            id="number_of_teams"
                                            value={this.state.number_of_teams}
                                            onChange={this.handle}
                                            placeholder="Enter number of teams"
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col xs="2">
                                        <Label>Host: </Label>
                                    </Col>
                                    <Col xs="10">
                                        <Input
                                            type="name"
                                            name="country"
                                            id="country"
                                            value={this.state.country}
                                            onChange={this.handle}
                                            placeholder="Enter host country name"
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col xs="2">
                                        <Label>Winner: </Label>
                                    </Col>
                                    <Col xs="10">
                                        <Input
                                            type="select"
                                            name="winner"
                                            id="winner"
                                            value={this.state.winner}
                                            onChange={this.handle1}
                                            placeholder="Enter the winner"
                                        >
                                            <option>
                                                Choose winner from dropdown
                                            </option>
                                            {ops}
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

export default AddSeason;
