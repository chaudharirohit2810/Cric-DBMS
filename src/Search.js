import React, {Component} from 'react'
import { Button, Col, Container, Form, FormGroup, Input, Row } from 'reactstrap'
import axios from 'axios'
import PlayerCard1 from './components/Utils/PlayerCard1'

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

    // componentDidMount() {
    //     axios.get(`http://localhost:5000/players/find`)
    //     .then((response) => {
    //         this.setState({
    //             players: response.data
    //         })
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })
    // }

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

        const players_info = players.map((player, index) => (
            <React.Fragment key={player.player_id}>
                <PlayerCard1 player={player} />
                {/* <Col lg="1"></Col> */}
            </React.Fragment>
        ));



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
                <Row style={{"marginTop": "30px"}}>
                    {
                        players_info
                    }
                </Row>
                
            </Container>
        )
    }
}

export default Search