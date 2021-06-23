import React, { Component } from 'react'
import { Button, Navbar, Nav, Jumbotron, Container, NavDropdown, FormControl, Form } from 'react-bootstrap'
import { Redirect, Link } from 'react-router-dom'
import SideBar from "./SideBar";
import axios from 'axios'


class Homepage extends Component {
    constructor(props) {
        super(props)
        const login = JSON.parse(localStorage.getItem('login'))
        console.log(login)
        // const token = login.token
        // console.log(token)
    
        let loggedIn = true;
        if (login == null) {
          loggedIn = false;
        }
        this.state = {
            loggedIn,
            state : {}
        }
        console.log(this.state.state.admin)
    }
    
    state = {};
    getAdmin = () => {
      const login = JSON.parse(localStorage.getItem('login'))
      const axiosConfig = {
          "headers": {
              "Authorization": "Bearer " + login.token
          }
      }
      axios.get('admin/' + login.kd_admin, axiosConfig)
          .then(res => {
              console.log(res.data.token)
              this.setState({
                  admin: res.data.data[0]
              })
          })
          .catch(err => {
              console.log(err)
          })
  }

    handleClick = e => {
        localStorage.removeItem("login")
        this.props.history.push("/login")
    }

    render() {
      const data = JSON.parse(localStorage.getItem('login'))
      if (this.state.loggedIn === false) {
          return <Redirect to="/login" />;
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
                            <h1>Welcome, {data.nama}</h1>
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