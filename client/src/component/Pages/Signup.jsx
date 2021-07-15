import React, { Component } from 'react'
import '../Assets/Signup.css';
import SimpleReactValidator from 'simple-react-validator';
import { Grid, Paper, Typography, TextField } from '@material-ui/core'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Navbar, Nav } from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'


export default class Signup extends Component {

  constructor(props) {
    super(props)
    const login = JSON.parse(localStorage.getItem('login'))
    let loggedIn = true
    if (login == null) {
      loggedIn = false
    }
    this.validator = new SimpleReactValidator();
    this.state = {
      nama: "",
      email: "",
      password: "",
      loggedIn
    }

  };
  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClick = e => {
    this.props.history.push('login')
  }

  handleTo = e => {
    this.props.history.push("/")
}

  handleSubmit = e => {
    e.preventDefault();
    if (this.validator.allValid()) {
      axios.post('http://localhost:8000/registrasi', this.state)
        .then((response) => {
          console.log(response.data)
          this.setState({
            nama: "",
            email: "",
            password: ""
          })
          if (response.data.error === false)
          Swal.fire(
            'Success',
            `${response.data.message}`,
            'success'
            );
          else {
            Swal.fire(
              'Error',
              `${response.data.message}`,
              'error'
            );
          }
          this.props.history.push("/login")
        })
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  }

  render() {
    if (this.state.loggedIn === true) {
      return <Redirect to="/login" />;
    }
    return (

      ['Light'].map((variant, idx) => (

        <div className="register">

          <div className="Nav">
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand>Ourflow</Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link onClick={this.handleTo}>
                    Home
                </Nav.Link>
              </Nav>
              <Nav>
                <Button variant="secondary" block onClick={this.handleClick}>
                  Log In
                </Button>
              </Nav>
            </Navbar>
          </div>

          <center style={{
            height: "90vh",
            display: "flex",
          }}>
            <Grid container component="main" style={{
              width: '70vw',
              margin: "auto",
              justifyContent: "center",
            }}>
              <Grid item xs={10} sm={8} md={5} component={Paper} elevation={6} square >
                <div className="paper" style={{
                  // margin: 30,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: 30
                }}>
                  <Typography component="h1" variant="h5">
                    Register
                  </Typography>
                  <form noValidate onSubmit={this.handleSubmit} style={{ width: '100%' }}>
                    <div>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="nama"
                        label="Nama"
                        name="nama"
                        autoComplete="nama"
                        autoFocus
                        value={this.state.nama}
                        onChange={this.handleChange}
                        noValidate
                      />
                      {this.validator.message('nama', this.state.nama, `required`, { className: 'text-danger' })}
                    </div>
                    <div>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={this.state.email}
                        onChange={this.handleChange}
                        noValidate
                      />
                      {this.validator.message('email', this.state.email, `required|email`, { className: 'text-danger' })}
                    </div>
                    <div>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="password"
                        autoFocus
                        value={this.state.password}
                        onChange={this.handleChange}
                        noValidate
                      />
                      {this.validator.message('password', this.state.password, `required|min:6`, { className: 'text-danger' })}
                    </div>
                    <hr />
                    <Button
                      type="submit"
                      fullWidth
                      variant="dark"
                      color="primary"
                      block
                    >Sign Up</Button>
                    <Grid container>
                      <Grid item>
                        <div style={{ fontSize: 15 }}>
                          Already have an account?
                          <Link to="/login" variant="body2">
                            Sign In
                          </Link>
                        </div>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </Grid>
            </Grid>
          </center>
        </div>
      ))
    );
  }
}

