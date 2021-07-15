import React, { Component } from 'react'
import axios from 'axios'
import SimpleReactValidator from 'simple-react-validator';
import {Redirect, Link } from 'react-router-dom'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form, Button, Container, Row, Col, NavDropdown, Navbar, Nav, Card } from 'react-bootstrap';
import SideBar from '../Pages/SideBar'
import Swal from 'sweetalert2'

export default class UpdateBarang extends Component {

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
            nama_barang: "",
            satuan: "",
            harga_jual: "",
            harga_beli: "",
            stok: "",
            status: null,
            data: {},
            loggedIn,
            admin : []

        }
    }

    getAdmin = () => {
        const login = JSON.parse(localStorage.getItem('login'))
        const axiosConfig = {
            "headers": {
                "Authorization": "Bearer " + login.token
            }
        }
        axios.get('http://localhost:8000/admin/' + login.kd_admin, axiosConfig)
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
        const kd_barang = this.state.id
        console.log(this.state.data)
        axios.get(`http://localhost:8000/barang/${kd_barang}`)
            .then(res => {
                console.log(kd_barang);
                console.log(res.data.data[0].kd_barang);
                this.setState({
                    kd_barang: res.data.data[0].kd_barang,
                    nama_barang: res.data.data[0].nama_barang,
                    satuan: res.data.data[0].satuan,
                    harga_jual: res.data.data[0].harga_jual,
                    harga_beli: res.data.data[0].harga_beli,
                    stok: res.data.data[0].stok,
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
            kd_barang: this.state.id,
            nama_barang: this.state.nama_barang,
            satuan: this.state.satuan,
            harga_jual: this.state.harga_jual,
            harga_beli: this.state.harga_beli,
            stok: this.state.stok,
            status: this.state.status,
        }
        const kd_barang = this.state.id;
        console.log(this.state.data)
        axios.put(`http://localhost:8000/ubah/barang/${kd_barang}`, data)
            .then(data => {
                if (this.validator.allValid()) {
                    e.preventDefault();
                    Swal.fire(
                        'Success',
                        'Your data has been updated!',
                        'success'
                    );
                    this.setState({
                        kd_barang: "",
                        nama_barang: "",
                        satuan: "",
                        harga_jual: "",
                        harga_beli: "",
                        stok: "",
                        status: "",
                    })
                    this.props.history.push("/barang")
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
                    'cant updated barang!',
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
                    style={{ width: '50rem' }}
                    className="bagan"
                >
                    <Card.Body>

                        <Col md={-2}>
                            <Link to={"/barang/"}><Button className="mr-2" variant="outline-primary" block=""><FontAwesomeIcon icon={faLongArrowAltLeft} /></Button></Link>
                        </Col><br />
                        <Form onSubmit={this.editData} noValidate>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>
                                    Kode Barang
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="text"
                                        onChange={this.handleChange}
                                        value={this.state.kd_barang}
                                        className=""
                                        placeholder="Kode Barang *"
                                        noValidate />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>
                                    Nama Barang
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="text"

                                        value={this.state.nama_barang}
                                        className=""
                                        placeholder="Nama Barang *"
                                        name="nama_barang"
                                        id="nama_barang"
                                        onChange={this.handleChange}
                                        noValidate />
                                    <div style={{ fontSize: 15, color: 'red' }}>
                                        {this.validator.message('Nama Barang', this.state.nama_barang, 'required')}
                                    </div>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>
                                    Satuan
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="text"

                                        value={this.state.satuan}
                                        className=""
                                        placeholder="Satuan *"
                                        name="satuan"
                                        onChange={this.handleChange}
                                        noValidate />
                                    <div style={{ fontSize: 15, color: 'red' }}>
                                        {this.validator.message('Satuan', this.state.satuan, 'required')}
                                    </div>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>
                                    Harga Jual
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="text"

                                        value={this.state.harga_jual}
                                        className=""
                                        placeholder="Harga Jual *"
                                        name="harga_jual"
                                        onChange={this.handleChange}
                                        noValidate />
                                    <div style={{ fontSize: 15, color: 'red' }}>
                                        {this.validator.message('Harga Jual', this.state.harga_jual, 'required')}
                                    </div>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>
                                    Harga Beli
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="text"

                                        value={this.state.harga_beli}
                                        className=""
                                        placeholder="Harga Beli *"
                                        name="harga_beli"
                                        onChange={this.handleChange}
                                        noValidate />
                                    <div style={{ fontSize: 15, color: 'red' }}>
                                        {this.validator.message('Harga Beli', this.state.harga_beli, 'required')}
                                    </div>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>
                                    Stok
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="text"

                                        value={this.state.stok}
                                        className=""
                                        placeholder="Stok *"
                                        name="stok"
                                        onChange={this.handleChange}
                                        noValidate />
                                    <div style={{ fontSize: 15, color: 'red' }}>
                                        {this.validator.message('Stok', this.state.stok, 'required')}
                                    </div>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>Status</Form.Label>
                                <Col sm={8}>
                                    <Form.Control as="select"
                                        value={this.state.status}
                                        className=""
                                        placeholder="Status"
                                        name="status"
                                        onChange={this.handleChange}>
                                        <option>=== select ===</option>
                                        <option>0</option>
                                        <option>1</option>
                                    </Form.Control>
                                    <div style={{ fontSize: 15, color: 'red' }}>
                                        {this.validator.message('Status', this.state.status, 'required')}
                                    </div>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col sm={{ span: 10, offset: 2 }}>
                                    <Button variant="outline-primary" type="submit" >Update</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
