import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form, Button, Container, Row, Col, NavDropdown, Navbar, Nav, Card } from 'react-bootstrap';
import SideBar from '../Pages/SideBar'
import Swal from 'sweetalert2'

export default class ViewPenjualan extends Component {

    constructor(props) {
        super(props);
        const login = JSON.parse(localStorage.getItem('login'))
        let loggedIn = true
        if (login == null) {
            loggedIn = false
        }

        this.state = {
            id: this.props.match.params.kd_penjualan,
            data: {},
            loggedIn,
            admin : []
        };
    }
    getPostAPI() {
        const kd_penjualan = this.state.id
        console.log(this.state.id)
        axios.get(`http://localhost:8000/penjualan/${kd_penjualan}`)
            .then((res) => {
                console.log(res)
                console.log(res.data.data)
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

    componentDidMount() {
        this.getPostAPI();
        this.getAdmin()
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
                    style={{ width: '62rem' }}
                    className="bagan"
                >
                    <Card.Body>

                        <Col md={-2}>
                            <Link to={"/penjualan"}><Button className="mr-2" variant="outline-primary" block=""><FontAwesomeIcon icon={faLongArrowAltLeft} /></Button></Link>
                        </Col><br />
                        <Form>

                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>
                                    Kode Penjualan
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control
                                        value={this.state.data.kd_penjualan}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>
                                    Tanggal Penjualan
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control
                                        value={this.state.data.tgl_penjualan}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>
                                    Kode Admin
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control
                                        value={this.state.data.kd_admin}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>
                                    Sudah Dibayar
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control
                                        value={this.state.data.dibayar}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>
                                    Total Penjualan
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control
                                        value={this.state.data.total_penjualan}
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
