import React, { Component } from 'react'
import '../Assets/Signup.css';
import SimpleReactValidator from 'simple-react-validator';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Card, Form, Navbar, Nav, Container, Col } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'


export default class Signup extends Component {

    constructor(props){
        super(props)
        this.validator = new SimpleReactValidator;
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            password2: "",
    }

    };
    change = e => {
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleClick = e => {
      this.props.history.push("/login")
    }
    handleSubmit = e => {
        e.preventDefault();
        if (this.validator.allValid()) {
            Swal.fire(
                'Good Job!',
                'Your signup is successfully!',
                'success'
            );
            this.setState({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                password2: "",
            })
            this.validator.hideMessages();
            // this.props.onSubmit(this.state);
             console.log(this.state);
          } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
          }
        e.preventDefault();
        // const data = {
        //     first_name: this.state.firstName,
        //     last_name: this.state.lastName,
        //     email: this.state.email,
        //     password: this.state.password,
        //     password2: this.state.password2
        // };
        
        // axios.post('http://localhost:8000/register', data).then(
        //     res => {
        //         console.log(res)
        //     }
        // ).catch(
        //     err => {
        //         console.log(err);
        //     }
        // )
    };

  render() {

    return (

      ['Light'].map((variant, idx) => (

        <div className="register">

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
              <Nav>
                <Button variant="secondary" block onClick={this.handleClick}>
                  Log In
                </Button>
              </Nav>
            </Navbar>
          </div>

          <div className="wrapper">
            <Container>
              <Card
                style={{ width: '28rem', borderRadius: 15 }}
                className="login-form"
                bg={variant.toLowerCase()}
                key={idx}
                text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
              >
                <Card.Title>
                  <div className="judul">
                   <h3>Sign Up</h3>
                </div>
                   <div className="innertext"></div>
                </Card.Title>
                <Card.Body>

                  <Form onSubmit={this.handleSubmit} noValidate>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGroupfirstName">
                      <div className="firstName">
                        <Form.Label htmlFor="firstName">Firstname</Form.Label>
                        <Form.Control
                          style={{ borderRadius: 15 }}
                          value={this.state.firstName} placeholder="FirstName *" name="firstName" onChange={e => this.change(e)} noValidate/>
                          <div style={{ fontSize: 15, color: 'red'}}>
                          {this.validator.message('First Name', this.state.firstName, 'required|alpha')}
                      </div>
                      </div>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGrouplastName">
                      <div className="LastName">
                        <Form.Label htmlFor="LastName">Last Name</Form.Label>
                        <Form.Control
                          style={{ borderRadius: 15 }}
                          value={this.state.lastName} placeholder="LastName *" name="lastName" onChange={e => this.change(e)} noValidate/>
                          <div style={{ fontSize: 15, color: 'red'}}>
                     {this.validator.message('Last Name', this.state.lastName, 'required|alpha')}
                      </div>
                      </div>
                    </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="formGroupemail">
                      <div className="email">
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control type="email"
                          style={{ borderRadius: 15 }}
                          className=""
                          value={this.state.email} placeholder="Email *" name="email" onChange={e => this.change(e)} noValidate/>
                          <div style={{ fontSize: 15, color: 'red'}}>
                    {this.validator.message('Email', this.state.email, 'required|email')} 
                    </div>
                    </div>  
                    </Form.Group>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGrouppassword">
                      <div className="password">
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control type="password"
                          style={{ borderRadius: 15 }}
                          className=""
                          value={this.state.password} placeholder="Password *" name="password" onChange={e => this.change(e)} noValidate/>
                          <div style={{ fontSize: 15, color: 'red'}}>
                          {this.validator.message('Password', this.state.password,   'required|alpha_num|min:5')}   
                          </div>
                      </div>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGrouppassword2">
                      <div className="password2">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password"
                          style={{ borderRadius: 15 }}                     
                          className=""
                          value={this.state.password2} placeholder="Confirm Password *" name="password2" onChange={e => this.change(e)} noValidate />
                          <div style={{ fontSize: 15, color: 'red'}}>
                          {this.validator.message('Password', this.state.password2, `required|in:${this.state.password}`, { messages: { in: 'Password need to match !' } })}
                        </div>
                      </div>
                    </Form.Group>
                    </Form.Row>
                    <Button type="submit" variant="dark" block style={{ borderRadius: 15 }} >
                      Create Account
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

