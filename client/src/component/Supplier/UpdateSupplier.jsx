import React, { Component } from 'react'
import axios from 'axios'
import SimpleReactValidator from 'simple-react-validator';
import {Redirect, Link } from 'react-router-dom'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form, Button, Container, Row, Col, NavDropdown, Navbar, Nav, Card } from 'react-bootstrap';
import SideBar from '../Pages/SideBar'
import Swal from 'sweetalert2'

export default class View extends Component {

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
        const login = JSON.parse(localStorage.getItem('login'))
    let loggedIn = true
    if (login == null) {
      loggedIn = false
    }
        this.state = {

            id: this.props.match.params.id,
            nama_supplier: "",
            alamat: "",
            data: {},
            loggedIn,
            admin : []

        }
    }

    getAdmin = () => {
        const login = JSON.parse(localStorage.getItem('login'))
        axios.get('http://localhost:8000/admin/' + login.kd_admin)
            .then(res => {
              console.log(res.data.data[0])
                this.setState({
                    admin: res.data.data[0]
                })
                console.log(this.state.admin)
            })
            .catch(err => {
                console.log(err)
            })
    }

    getData() {
        const kd_supplier = this.state.id
        console.log(this.state.data)
        axios.get(`http://localhost:8000/supplier/${kd_supplier}`)
            .then(res => {
                console.log(kd_supplier);
                console.log(res.data[0]);
                this.setState({
                    kd_supplier: res.data[0].kd_supplier,
                    nama_supplier: res.data[0].nama_supplier,
                    alamat: res.data[0].alamat
                });
            })
            .catch(err => {
                Swal.fire(
                    'The Internet?',
                    'That thing is still around?',
                    'question'
                );
                console.log(err)
            })
    }
    componentDidMount() {
        this.getData();
        this.getAdmin()
    }

    editData = e => {
        e.preventDefault();
        const data = {
            nama_supplier: this.state.nama_supplier,
            alamat: this.state.alamat
        }
        const kd_supplier = this.state.id;
        console.log(this.state.data)
        axios.put(`http://localhost:8000/ubah/supplier/${kd_supplier}`, data)
            .then(data => {
                if (this.validator.allValid()) {
                    e.preventDefault();
                    Swal.fire(
                        'Success',
                        'Your data has been updated!',
                        'success'
                    );
                    this.setState({
                        nama_supplier: "",
                        alamat: "",
                    })
                    this.props.history.push("/supplier")
                    this.validator.hideMessages();
                    console.log(this.state);
                } else {
                    this.validator.showMessages();
                    // rerender to show messages for the first time
                    // you can use the autoForceUpdate option to do this automatically`
                    this.forceUpdate();
                }
                // this.props.history.push("/admin")
                console.log(this.state)
            })
            .catch(err => {
                Swal.fire(
                    'error',
                    'cant updated supplier!',
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
                <Card
                    style={{ width: '40rem' }}
                    className="bagan"
                >
                    <Card.Body>

                        <Col md={-2}>
                            <Link to={"/supplier/"}><Button className="mr-2" variant="primary" block=""><FontAwesomeIcon icon={faLongArrowAltLeft} /></Button></Link>
                        </Col><br />
                        <Form onSubmit={this.editData} noValidate>
                            <Form.Group as={Row}>
                                <Form.Label column sm={3}>
                                    Kode Supplier
                                </Form.Label>
                                <Col sm={7}>
                                    <Form.Control type="text"
                                        onChange={this.handleChange}
                                        value={this.state.kd_supplier}
                                        className=""
                                        placeholder="Kode Supplier *"
                                        noValidate />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={3}>
                                    Nama Supplier
                                </Form.Label>
                                <Col sm={7}>
                                    <Form.Control type="text"
                                        onChange={this.handleChange}
                                        value={this.state.nama_supplier}
                                        className=""
                                        placeholder="Nama Supplier *"
                                        name="nama_supplier"
                                        id="nama_supplier"
                                        noValidate />
                                         <div style={{ fontSize: 15, color: 'red' }}>
                                        {this.validator.message('Nama Supplier', this.state.nama_supplier, 'required')}
                                    </div>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={3}>
                                    Alamat
                                </Form.Label>
                                <Col sm={7}>
                                    <Form.Control type="text"

                                        value={this.state.alamat}
                                        className=""
                                        placeholder="Alamat *"
                                        name="alamat"
                                        onChange={this.handleChange}
                                        noValidate />
                                         <div style={{ fontSize: 15, color: 'red' }}>
                                        {this.validator.message('Alamat', this.state.alamat, 'required')}
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
