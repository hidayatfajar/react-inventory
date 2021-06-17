import React, { Component } from 'react'
import { Button, Navbar, Nav, Jumbotron, Container, Carousel, Col, Row} from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'


export default class Welcome extends Component {

    
    constructor(props){
        super(props)
        const token = localStorage.getItem("token")

        let loggedIn = true
        if(token == null){
            loggedIn = false
    }
    this.state = {
        loggedIn
    }
    }

    render() {
        return (
          <div className="home">
            <div className="Nav">
              <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Ourflow</Navbar.Brand>
                <Nav className="mr-auto">
                  <Nav.Link>
                    <Link to="/">
                      Home
                      </Link>
                  </Nav.Link>
                </Nav>
                  <Nav.Link>
                    <Link to="/login">
                      Login
                      </Link>
                  </Nav.Link>
                <Nav>
                <Link to="/signup">
                      Signup
                      </Link>
                </Nav>
              </Navbar>
            </div>
            <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://placeimg.com/700/313/tech/greyscale"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>Make A Simple Financing Application</h3>
      <p>Join now with us. </p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://placeimg.com/700/313/tech"
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3>Code Is Read More Than It Is Written.</h3>
      <p>Learn more.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://placeimg.com/700/313/tech/grayscale"
      alt="Third slide"
    />
    <Carousel.Caption>
      <h3>Create Your Simple Project </h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
        </div>

        )
        }
    }