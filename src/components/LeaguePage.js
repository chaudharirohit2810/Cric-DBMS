import React, {Component} from 'react'
import { Col, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
import AddLeague from './AddLeague'
import axios from 'axios'

class LeaguePage extends Component {

    constructor() {
        super()
        this.state = {
            leag : [],
        }
    }

    componentDidMount(props) {
        axios.get('http://localhost:5000/league_type/')
        .then(response => {
            this.setState({
                leag: response.data
            })
        })
        .catch(error => {
            console.log(error)
        })
    }


    league_adder = (data) => {
        this.setState({
            leag: [...this.state.leag, data]
        })
    }

    render() {

        const leaguesss = this.state.leag.map((lea, index) =>
            <React.Fragment>
            <Col lg="6" style={{"marginBottom": "10px"}}>
                <Row>
                    <Col lg="1"></Col>
                        <Col lg="10" className="match">
                            <div style ={{"text-align": "center"}}>
                                <img src={`${lea.league_logo_link}`} style={{"height": "100px", "marginBottom": "10px"}} alt={`${lea.league_name} logo`}></img>
                            </div>
                            <div style ={{"text-align": "center"}}>
                                {`League Name: ${lea.league_name}`}
                            </div>
                            <div style ={{"text-align": "center"}}>
                                {`League Format: ${lea.league_format}`}
                            </div>

                            <div style ={{"text-align": "center", "marginTop": "10px"}}>
                                <Link className="btn btn-info" to={
                                    {
                                        pathname: `/${lea.league_name}`,
                                        state: {
                                            league_type_id: lea.league_type_id
                                        } 
                                    }    
                                }>Details</Link> 
                            </div>
                        </Col>
                    <Col lg="1"></Col>
                </Row>
            </Col>
            {/* <Col lg="1"></Col> */}
            </React.Fragment>
        )

        return(
            <React.Fragment>
                <Row>
                <Col>
                <div className="titles">Popular Leagues</div>
                </Col>
                <Col>
                <AddLeague league_changer={this.league_adder}/>
                </Col>
                </Row>
                
                <Row>
                    {leaguesss}
                </Row>
            </React.Fragment>
        )
    }
}

export default LeaguePage