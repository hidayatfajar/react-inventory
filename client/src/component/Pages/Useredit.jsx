import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form, Button, Container, Row, Col, NavDropdown, Navbar, Nav, Card } from 'react-bootstrap';
import SideBar from '../Pages/SideBar'
import Swal from 'sweetalert2'
import SimpleReactValidator from 'simple-react-validator';

export default class UpdatePerusahaan extends Component {

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
        const login = JSON.parse(localStorage.getItem('login'))
        let loggedIn = true
        if (login == null) {
            loggedIn = false
        }
        this.state = {
            nama : "",
            email : "",
            password : ""
        }
    }

    getAdmin = () => {
        const login = JSON.parse(localStorage.getItem('login'))
        axios.get('http://localhost:8000/admin/' + login.kd_admin)
          .then(res => {
            console.log(res.data.data[0])
            console.log(this.state)
            this.setState({
              nama: res.data.data[0].nama,
              email : res.data.data[0].email,
              password : res.data.data[0].password,
              kd_admin : res.data.data[0].kd_admin
            })
          })
          .catch(err => {
            console.log(err)
          })
      }
      componentDidMount () {
        this.getAdmin()
      }

    editData = e => {
        e.preventDefault();
        const data = {
            nama: this.state.nama,
            email: this.state.email,
            password: this.state.password
        }
        const kd_admin = this.state.kd_admin;
        console.log(this.state)
        axios.put(`http://localhost:8000/ubah/admin/${kd_admin}`, data)
            .then(data => {
                if (this.validator.allValid()) {
                    e.preventDefault();
                    Swal.fire(
                        'Good Job!',
                        'Your data has been updated!',
                        'success'
                    );
                    this.setState({
                        nama: "",
                        email: "",
                        password: "",
                    })
                    this.validator.hideMessages();
                    console.log(this.state);
                } else {
                    this.validator.showMessages();
                    // rerender to show messages for the first time
                    // you can use the autoForceUpdate option to do this automatically`
                    this.forceUpdate();
                }
                this.props.history.push("/user")
                // this.props.history.push("/admin")
                console.log(this.state)
            })
            .catch(err => {
                Swal.fire(
                    'error',
                    'Cant updated Admin',
                    'error'
                );
                console.log(err)
            })
    }

    handleChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleClick = (e) => {
        localStorage.removeItem("login");
        this.props.history.push("/login");
    };
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

                                <NavDropdown title={this.state.nama} id="basic-nav-dropdown">
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
                <Card
                    style={{ width: '41rem' }}
                    className="bagan"
                >
                    <Card.Body>

                        <Col md={-2}>
                            <Link to={"/user/"}><Button className="mr-2" variant="primary" block=""><FontAwesomeIcon icon={faLongArrowAltLeft} /></Button></Link>
                        </Col><br />
                        <Form onSubmit={this.editData} noValidate>
                            <Form.Group as={Row}>
                                <Form.Label column sm={3}>
                                    Nama
                                </Form.Label>
                                <Col sm={7}>
                                    <Form.Control type="text"

                                        value={this.state.nama}
                                        className=""
                                        name="nama"
                                        placeholder="Nama *"
                                        onChange={this.handleChange}
                                        noValidate />
                                        {this.validator.message('Nama Perusahaan', this.state.nama, 'required')}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={3}>
                                    Email
                                </Form.Label>
                                <Col sm={7}>
                                    <Form.Control type="text"

                                        value={this.state.email}
                                        className=""
                                        placeholder="Email *"
                                        name="email"
                                        id="email"
                                        onChange={this.handleChange}
                                        noValidate />
                                    <div style={{ fontSize: 15, color: 'red' }}>
                                        {this.validator.message('Nama Perusahaan', this.state.email, 'email|required')}
                                    </div>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={3}>
                                    Password
                                </Form.Label>
                                <Col sm={7}>
                                    <Form.Control type="password"

                                        value={this.state.password}
                                        className=""
                                        placeholder="Alamat *"
                                        name="password"
                                        onChange={this.handleChange}
                                        noValidate />
                                    <div style={{ fontSize: 15, color: 'red' }}>
                                        {this.validator.message('password', this.state.password, 'required')}
                                    </div>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col sm={{ span: 7, offset: 3 }}>
                                    <Button type="submit" >Update</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
