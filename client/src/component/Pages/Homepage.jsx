import React, { Component } from 'react'
import { Button, Navbar, Nav, Jumbotron, Container, NavDropdown, FormControl, Form } from 'react-bootstrap'
import { Redirect, Link } from 'react-router-dom'
import SideBar from "./SideBar";


class Homepage extends Component {
    constructor(props) {
        super(props)
        const token = localStorage.getItem("token")

        let loggedIn = true
        if (token == null) {
            loggedIn = false
        }

        this.state = {
            loggedIn
        }
    }

    handleClick = e => {
        localStorage.removeItem("token")
        this.props.history.push("/login")
    }

    render() {
        if (this.state.loggedIn === false) {
            return <Redirect to="/login" />
        }
        return (
            <div>
               {/* NavBar */}
          <Navbar bg="dark" variant="dark" fixed="top">
            <Container>
              <Navbar.Brand href="#">Ourflow</Navbar.Brand>
              <Form inline>
                <Nav>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#">Profile</NavDropdown.Item>
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
                <div className="place">

                    <Jumbotron>
                        <Container>
                            <h1>Welcome</h1>
                            <p className="a">
                            Welcome to react bootstrap homepage, this is where you started
                            </p>
                            <p>
                            <Button variant="primary">Learn more</Button>
                            </p>
                        </Container>
                    </Jumbotron>
                </div>
            </div>
        )
    }
}

export default Homepage;