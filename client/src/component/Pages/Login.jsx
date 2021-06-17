import React, { Component } from 'react'
import { Button, Navbar, Nav, Jumbotron, Container, Card, Form } from 'react-bootstrap'
import SimpleReactValidator from 'simple-react-validator';
import { Redirect, Link } from "react-router-dom";
import '../Assets/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class Login extends Component {

  constructor(props) {
    super(props)
    const token = localStorage.getItem("token")

    let loggedIn = true
    if (token == null) {
      loggedIn = false
      this.validator = new SimpleReactValidator;
    }
    this.state = {
      email: '',
      password: '',
      loggedIn
    }
  }
  handleClick = e => {
    this.props.history.push("/signup")
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
    e.preventDefault();
  }
  handleSubmit = e => {

    if (this.validator.allValid()) {
      e.preventDefault();
      this.validator.hideMessages();
      console.log(this.state);
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
    const { email, password } = this.state
    if (email === "fajarnh67@gmail.com" && password === "asd") {
      localStorage.setItem("token", "aasdhjgaidfgaiofgqe")
      this.setState({
        loggedIn: true
      })
    }
    e.preventDefault();

  }
  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/home" />
    }
    return (
      [
        'Light'
      ].map((variant, idx) => (

        <div className="login">

          <div className="Nav">
            <Navbar bg="dark" variant="dark" expands="md">
              <Navbar.Brand>Ourflow</Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link>
                  <Link to="/">
                    Home
                          </Link>
                </Nav.Link>
              </Nav>
              <Nav>
                <Button variant="secondary" block onClick={this.handleClick}>
                  Sign Up
                        </Button>
              </Nav>
            </Navbar>
          </div>
          <div className="wrapper-login">
            <Container>
              <Card
                style={{ width: '28rem', borderRadius: 15 }}
                className="login-form"
                bg={variant.toLowerCase()}
                key={idx}
                text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
              >
                <Card.Title>
                  <div className="text-center">
                    <h3>Login</h3>
                  </div>
                </Card.Title>
                <Card.Body>

                  <Form onSubmit={this.handleSubmit} noValidate>

                    <Form.Group controlId="formGroupemail">
                      <div className="email">
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control type="email"
                          style={{ borderRadius: 15 }}
                          className=""
                          placeholder="Email *"
                          name="email"
                          value={this.state.email} onChange={this.onChange} noValidate />
                        <div style={{ fontSize: 15, color: 'red' }}>
                          {this.validator.message('Email', this.state.email, 'required|email')}
                        </div>
                      </div>
                    </Form.Group>

                    <Form.Group controlId="formGrouppassword">
                      <div className="password">
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control type="password"
                          style={{ borderRadius: 15 }}
                          className=""
                          placeholder="Password *"
                          name="password"
                          value={this.state.password} onChange={this.onChange} noValidate />
                        <div style={{ fontSize: 15, color: 'red' }}>
                          {this.validator.message('Password', this.state.password, 'required|alpha')}
                        </div>
                      </div>
                    </Form.Group>
                    <Button type="submit" variant="dark" block style={{ borderRadius: 15 }} >
                      Login
                          </Button>
                  </Form>
                </Card.Body>
              </Card >
            </Container>
          </div>
        </div>
      ))
    );
  }
}