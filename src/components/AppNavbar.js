import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import HomePage from './HomePage';
import './Styles.css'
import {
    Collapse,
    Navbar,
    NavbarBrand, 
    NavbarToggler,
    Nav,
    NavItem,
    Container
} from 'reactstrap';
import Search from '../Search';
import League_Seasons from './League_Seasons';
import Season_Details from './Season_Details';
import AddPlayer from './AddPlayer';
import AddTeam from './AddTeam';
import TeamDetails from './TeamDetails';
import Team_Seasons from './Team_Seasons';

class AppNavbar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render(){
        return(
            <Router>
                <Navbar color="dark" dark expand="sm" className="mb-5" fixed="top">
                    <Container>
                        <NavbarBrand>CricStats</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar> 
                                <NavItem>
                                    <Link className="linkclass" to="/">Home</Link>
                                </NavItem>
                                <NavItem>
                                    <Link className="linkclass" to="/Search">Search</Link>
                                </NavItem>
                                <NavItem>
                                    <AddPlayer></AddPlayer>
                                </NavItem> 
                                <NavItem>
                                    <AddTeam />
                                </NavItem>    
                            </Nav> 
                        </Collapse>
                    </Container>
                </Navbar>
                <Switch>  
                    <Route path="/Search" exact component={Search}/>
                    <Route path="/Search/:team_name" component={Team_Seasons}/>  
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/:league" exact component={League_Seasons}/>
                    <Route path={`/:league/:season`} exact component={Season_Details}/>
                    <Route path={`/:league/:season/:team`} component={TeamDetails}/>                             
                </Switch>                                 
            </Router>
        )
    }
}

export default AppNavbar