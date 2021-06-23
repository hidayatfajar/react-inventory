import React, { Component } from 'react'
import SimpleReactValidator from 'simple-react-validator';
import { Form, Button, Container, Row, Col, NavDropdown, Navbar, Nav, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import SideBar from '../Pages/SideBar'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from 'sweetalert2'

class AddBarang extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({autoForceUpdate: this});
    const login = JSON.parse(localStorage.getItem('login'))
    let loggedIn = true
    if (login == null) {
      loggedIn = false
    }

    this.state = {
      kd_barang: "",
      nama_barang: "",
      satuan: "",
      harga_jual: "",
      harga_beli: "",
      stok: "",
      status: null,
      loggedIn

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
    axios.post("http://localhost:8000/tambah/barang", this.state)
      .then((result) => {
        if (this.validator.allValid()) {
          e.preventDefault();
          Swal.fire(
            'Success',
            'Your data has been submitted!',
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
          'Cant Add New Barang!',
          'error'
        );
        console.log(err)
      })
  };

  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/login" />;
  }
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
          style={{ width: '50rem' }}
          className="bagan"
        >
          <Card.Body>

            <Col md={-2}>
              <Link to={"/barang/"}><Button className="mr-2" variant="primary" block=""><FontAwesomeIcon icon={faLongArrowAltLeft} /></Button></Link>
            </Col><br />
            <Form onSubmit={this.handleSubmit} noValidate>

              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Kode Barang
                </Form.Label>
                <Col sm={8}>
                  <Form.Control

                    value={this.state.kd_barang}
                    type="text"
                    className=""
                    placeholder="Kode Barang *"
                    name="kd_barang"
                    id="kd_barang"
                    noValidate
                    onChange={this.handleChange}
                  />
                  <div style={{ fontSize: 15, color: 'red' }}>
                    {this.validator.message('Kode Barang', this.state.kd_barang, 'required')}
                    </div>
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

export default AddBarang;
