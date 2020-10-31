import React, {Component} from 'react'
import {Container} from 'reactstrap'
import LeaguePage from './LeaguePage'
import Match from './Match'

class HomePage extends Component {
    render(){
        return(
            <Container className="toplookout">
                <Match />
                <LeaguePage />
            </Container>
        )
    }
}

export default HomePage