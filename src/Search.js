import React, {Component} from 'react'
import { Button, Col, Container, Form, FormGroup, Input, Row } from 'reactstrap'
import axios from 'axios'

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entry: '',
            player_id: '',
            team_id: '',
            league_type_id: '',
            players: [],
            teams: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/players/find`)
        .then((response) => {
            this.setState({
                players: response.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    componentDidUpdate(prevProps, prevState) {
        
        if(prevState.entry !== this.state.entry) {
            const params = {
                name: this.state.entry
            }
            axios.get(`http://localhost:5000/players/find/`,  {params: params})
            .then((response) => {
                this.setState({
                    players: response.data
                })
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }

    render() {
        const {players} = this.state
        const players_info = players.map(player => (
            <div>{player.first_name} {player.last_name}</div>
        ))
        return(
            <Container className="toplookout">
                <Form>
                    <FormGroup>
                        <Row>
                            <Col lg={2}></Col>
                            <Col lg={7}>
                            <Input type="text" name="text" id="searchquery" placeholder="Search" onChange={(e) => this.setState({entry: e.target.value})}/>
                            </Col>
                            <Col lg="3">
                                <Button sm={2} style={{height: '40px'}}>Search</Button>
                            </Col>
                        </Row>
                    </FormGroup>
                </Form>
                <div style={{"marginTop": "30px"}}>
                    {
                        players_info
                    }
                </div>
                
            </Container>
        )
    }
}

export default Search