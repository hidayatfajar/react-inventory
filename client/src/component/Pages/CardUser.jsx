import React, { Component, Fragment } from 'react'
import { Navbar, Container, Form, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faUser, faChartLine, faStoreAlt, faCopy, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import SideBar from "./SideBar"

import '../Assets/CardUser.css'

export default class CardUser extends Component {
    state = {
        title: "Admin"
    }

    render() {
        return (
            <div>
                 {/* NavBar & Sidebar*/}
                 <Navbar bg="dark" variant="dark" fixed="top">
                    <Container>
                        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                        <Form inline>
                            <Nav>
                                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/user">Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={this.handleClick}>
                                        Log out
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Form>
                    </Container>
                </Navbar>

                <SideBar />
            <div className="pg">
                <div className="cardsusr-list">

                    <div className="cardusr 1">
                        <div className="cardusr_image">
                            <img src="https://i.pinimg.com/564x/5f/40/6a/5f406ab25e8942cbe0da6485afd26b71.jpg" />
                        </div>
                        <div className="cardusr_title title-white">
                            <p>{this.state.title}</p>
                        </div>
                    </div>

                </div>
            </div>
            </div>
        )
    }
}
