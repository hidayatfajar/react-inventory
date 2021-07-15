import { React, Component } from 'react'
import { Button, Navbar, Nav, Jumbotron, Container, NavDropdown, Form, Col, Image, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import { Redirect, Link } from 'react-router-dom'
import SideBar from "./SideBar";
import axios from 'axios'
import image from '../Assets/Kodok Senyum.jpg'


class Homepage extends Component {
  constructor(props) {
    super(props)
    const login = JSON.parse(localStorage.getItem('login'))
    let loggedIn = true;
    if (login == null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn,
      state: {},
      admin : []
    }
  }

  state = {};
  getAdmin = () => {
    const login = JSON.parse(localStorage.getItem('login'))
    const axiosConfig = {
      "headers": {
        "Authorization": "Bearer " + login.token
      }
    }
    axios.get('http://localhost:8000/admin/' + login.kd_admin, axiosConfig)
      .then(res => {
        console.log(res.data.data[0].nama)
        this.setState({
          admin: res.data.data[0]
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  componentDidMount () {
    this.getAdmin()
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
            <Navbar.Brand>Ourflow</Navbar.Brand>
            <Form inline>

              <Nav>

                <NavDropdown title={this.state.admin.nama} id="basic-nav-dropdown">
                  <NavDropdown.Item><Link to="/user">Profile</Link> </NavDropdown.Item>

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
              <Row>
              <Col xs={1}>
                <Image width={64} height={64} src={image} alt="INI GAMBAR" roundedCircle />
              </Col>
              <Col>
                <h1>Welcome, {this.state.admin.nama}</h1>
                <p className="a">
                  This is our first website. This where we started
                </p>
                <p>
                  <Button variant="primary">Learn more</Button>
                </p>
              </Col>
              </Row>
            </Container>
          </Jumbotron>
        </div>
      </div>
    )
  }
}

export default Homepage;