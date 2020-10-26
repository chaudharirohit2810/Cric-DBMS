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
    NavLink,
    Container
} from 'reactstrap';
import Search from '../Search';

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
                            </Nav> 
                        </Collapse>
                    </Container>
                </Navbar>
                <Switch>  
                    <Route path="/Search">
                        <Search />                               
                    </Route>  
                    <Route path="/">
                        <HomePage name="Shirdi"/>                               
                    </Route>
                </Switch>                                 
            </Router>
        )
    }
}

export default AppNavbar