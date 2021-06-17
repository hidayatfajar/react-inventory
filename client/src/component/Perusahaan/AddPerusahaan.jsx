import React, { Component } from 'react'

import SimpleReactValidator from 'simple-react-validator';
import { Form, Button, Container, Row, Col, NavDropdown, Navbar, Nav, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SideBar from '../Pages/SideBar'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from 'sweetalert2'

class CreatePerusahaan extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });

        this.state = {

            nama_perusahaan: "",
            alamat: "",
            pemilik: "",
            kota: "",
        }
    }

    handleChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state)
        axios.post("http://localhost:8000/tambah/perusahaan", this.state
            // , {
            //   headers: {
            //     "Content-Type":"application/json",
            //     "Accept" : "application/json"
            //   },
            //   body:JSON.stringify(this.state)
            // }
        ).then((result) => {
            if (this.validator.allValid()) {
                Swal.fire(
                    'Good Job!',
                    'Your data has been submitted!',
                    'success'
                );
                this.setState({
                    nama_perusahaan: "",
                    alamat: "",
                    pemilik: "",
                    kota: "",
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
            // this.props.history.push("/admin")
            console.log(result.data)
            console.log(this.state)
        })
        .catch(err => {
            Swal.fire(
              'error',
              'Cant Add New Perusahaan!',
              'error'
            );
            console.log(err)
          })
    };

    render() {

        return (
            <div>
                {/* NavBar */}
                <Navbar bg="dark" variant="dark" fixed="top">
                    <Container>
                        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                        <Form inline>
                            <Nav>
                                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#">Profile</NavDropdown.Item>
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
                className="bagan">
                    <Card.Body>
                        <Col md={-2}>
                            <Link to={"/perusahaan/"}><Button className="mr-2" variant="primary" block=""><FontAwesomeIcon icon={faLongArrowAltLeft} /></Button></Link>
                        </Col><br />
                        <Form onSubmit={this.handleSubmit} noValidate>
                            <Form.Group as={Row}>
                                <Form.Label column sm={3}>
                                    Nama Perusahaan
                </Form.Label>
                                <Col sm={7}>
                                    <Form.Control type="text"

                                        value={this.state.nama_perusahaan}
                                        className=""
                                        placeholder="Nama Perusahaan *"
                                        name="nama_perusahaan"
                                        id="nama_perusahaan"
                                        onChange={this.handleChange}
                                        noValidate />
                                        <div style={{ fontSize: 15, color: 'red' }}>
                                        {this.validator.message('Nama Perusahaan', this.state.nama_perusahaan, 'required')}
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
                                <Form.Label column sm={3}>
                                    Pemilik
                </Form.Label>
                                <Col sm={7}>
                                    <Form.Control type="text"

                                        value={this.state.pemilik}
                                        className=""
                                        placeholder="Nama Pemilik *"
                                        name="pemilik"
                                        onChange={this.handleChange}
                                        noValidate />
                                        <div style={{ fontSize: 15, color: 'red' }}>
                                        {this.validator.message('Pemilik', this.state.pemilik, 'required')}
                                    </div>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={3}>
                                    Kota
                </Form.Label>
                                <Col sm={7}>
                                    <Form.Control type="text"

                                        value={this.state.kota}
                                        className=""
                                        placeholder="Nama Kota *"
                                        name="kota"
                                        onChange={this.handleChange}
                                        noValidate />
                                        <div style={{ fontSize: 15, color: 'red' }}>
                                        {this.validator.message('Kota', this.state.kota, 'required')}
                                    </div>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col sm={{ span: 7, offset: 3 }}>
                                    <Button type="submit" >Create</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default CreatePerusahaan;
