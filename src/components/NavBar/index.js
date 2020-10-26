import React, { Component } from "react";
// import "./Styles.css";
import {
    Collapse,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    Container,
} from "reactstrap";
import { Link } from "react-router-dom";

class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };

    render() {
        return (
            <Navbar color="dark" dark expand="sm" className="mb-5" fixed="top">
                <Container>
                    <NavbarBrand>CricStats</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link className="linkclass" to="/">
                                    Home
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link className="linkclass" to="/Search">
                                    Search
                                </Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default AppNavbar;
