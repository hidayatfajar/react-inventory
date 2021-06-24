import React, { Component, Fragment } from 'react'
import { Navbar, Container, Form, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faUser, faChartLine, faStoreAlt, faCopy, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import SideBar from "./SideBar"
import axios from 'axios'
import '../Assets/CardUser.css'

export default class CardUser extends Component {
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
                            <p>{data.nama}</p>
                            <p>{data.email}</p>

                        </div>
                    </div>
                    {/* <div className="position" style={{color: 'black'}}>
                            <p style={{color: 'black'}}>Nama : {data.nama}</p>
                            <p style={{color: 'black'}}>Email : {data.email}</p>
                            </div> */}
                </div>
                </div>
            </div>

        )
    }
}
