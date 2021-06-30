import React, { Component } from 'react'
import axios from 'axios'
import {Redirect, Link } from 'react-router-dom'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form, Button, Container, Row, Col, NavDropdown, Navbar, Nav, Card } from 'react-bootstrap';
import SideBar from '../Pages/SideBar'
import Swal from 'sweetalert2'

export default class View extends Component {

    constructor(props) {
        super(props);
        const login = JSON.parse(localStorage.getItem('login'))
    let loggedIn = true
    if (login == null) {
      loggedIn = false
    }
        this.state = {

            id: this.props.match.params.id,
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

    getEmployee() {
        const kd_barang = this.state.id
        console.log(this.state.data)
        axios.get(`http://localhost:8000/barang/${kd_barang}`)
            .then(res => {
                console.log(kd_barang);
                console.log(res.data.data[0]);
                this.setState({
                    data: res.data.data[0]
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
        this.getEmployee();
        this.getAdmin()
    }
    handleChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleClick = (e) => {
        localStorage.removeItem("token");
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
                    style={{ width: '35rem' }}
                    className="bagan"
                >
                    <Card.Body>

                        <Col md={-2}>
                            <Link to={"/barang"}><Button className="mr-2" variant="primary" block=""><FontAwesomeIcon icon={faLongArrowAltLeft} /></Button></Link>
                        </Col><br />
                        <Form onSubmit={this.handleSubmit} noValidate>

                            <Form.Group as={Row}>
                                <Form.Label column sm={3}>
                                    Kode Barang :
                            </Form.Label>
                                <Col sm={7}>
                                    <Form.Control value={this.state.data.kd_barang} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={3}>
                                    Nama Barang :
                </Form.Label>
                                <Col sm={7}>
                                    <Form.Control type="text"

                                        value={this.state.data.nama_barang}
                                        className=""
                                        placeholder="Alamat *"
                                        name="alamat"
                                        noValidate />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={3}>
                                    Satuan :
                </Form.Label>
                                <Col sm={7}>
                                    <Form.Control type="text"

                                        value={this.state.data.satuan}
                                        className=""
                                        placeholder="Nama Pemilik *"
                                        name="pemilik"
                                        onChange={this.handleChange}
                                        noValidate />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={3}>
                                    Harga Jual :
                </Form.Label>
                                <Col sm={7}>
                                    <Form.Control type="text"

                                        value={this.state.data.harga_jual}
                                        className=""
                                        placeholder="Nama Kota *"
                                        name="kota"
                                        onChange={this.handleChange}
                                        noValidate />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={3}>
                                    Harga Beli    :
                </Form.Label>
                                <Col sm={7}>
                                    <Form.Control type="text"

                                        value={this.state.data.harga_beli}
                                        className=""
                                        placeholder="Nama Kota *"
                                        name="kota"
                                        onChange={this.handleChange}
                                        noValidate />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={3}>
                                    Stock :
                </Form.Label>
                                <Col sm={7}>
                                    <Form.Control type="text"

                                        value={this.state.data.stok}
                                        className=""
                                        placeholder="Nama Kota *"
                                        name="kota"
                                        onChange={this.handleChange}
                                        noValidate />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={3}>
                                    Status :
                </Form.Label>
                                <Col sm={7}>
                                    <Form.Control type="text"

                                        value={this.state.data.status}
                                        className=""
                                        placeholder="Nama Kota *"
                                        name="kota"
                                        onChange={this.handleChange}
                                        noValidate />
                                </Col>
                            </Form.Group>
                            {/* <Form.Group as={Row}>
                                <Col sm={{ span: 7, offset: 3 }}>
                                    <Button type="submit" >Create</Button>
                                </Col>
                            </Form.Group> */}
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
