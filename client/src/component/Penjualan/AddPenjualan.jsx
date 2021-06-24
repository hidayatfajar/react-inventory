import React, { Component } from 'react'
import axios from 'axios'
import SimpleReactValidator from 'simple-react-validator';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from "react-router-dom";
import { Button, Navbar, Nav, Container, Col, Row, Form, NavDropdown, Card } from "react-bootstrap";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { SearchBar, Search, defaultSorted } from "react-bootstrap-table2-toolkit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import SideBar from '../Pages/SideBar'

export default class AddPenjualan extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    const login = JSON.parse(localStorage.getItem('login'))
    let loggedIn = true
    if (login == null) {
      loggedIn = false
    }
    this.state = {
        tgl_penjualan: '',
        kd_barang: '',
        dibayar: '',
        quantity: '',
        loggedIn
    };
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
    axios.post("http://localhost:8000/penjualan", this.state)
      .then((result) => {
        console.log(result.data);
        if(result.data.error == false){
          Swal.fire(
            'success',
            'Data berhasil ditambahkan.',
            'success'
          );
        } else {
          Swal.fire(
            'error',
            'Kode Supplier tidak ditemukan.',
            'error'
          );
        }
        if (this.validator.allValid()) {
          e.preventDefault();
          this.setState({
            tgl_penjualan: '',
            kd_barang: '',
            dibayar: '',
            quantity: ''
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
          'Terjadi kesalahan silahkan coba beberapa saat lagi',
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
              <Link to={"/penjualan/"}><Button className="mr-2" variant="primary" block=""><FontAwesomeIcon icon={faLongArrowAltLeft} /></Button></Link>
            </Col><br />
            <Form onSubmit={this.handleSubmit} noValidate>

              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Nama Barang
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="date"

                    value={this.state.tgl_penjualan}
                    className=""
                    placeholder="Masukkan Tanggal Penjualan *"
                    name="tgl_penjualan"
                    id="tgl_penjualan"
                    noValidate
                    onChange={this.handleChange}
                  />
                  <div style={{ fontSize: 15, color: 'red' }}>
                    {this.validator.message('Nama Barang', this.state.tgl_penjualan, 'required')}
                  </div>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Kode Barang
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    value={this.state.kd_barang}
                    className=""
                    placeholder="Masukkan Kode Barang *"
                    name="kd_barang"
                    id="kd_barang"
                    onChange={this.handleChange}
                    noValidate />
                  <div style={{ fontSize: 15, color: 'red' }}>
                    {this.validator.message('Kode barang', this.state.kd_barang, 'required')}
                  </div>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Harga Beli
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="number"
                    value={this.state.dibayar}
                    className=""
                    placeholder="Masukkan Barang yang Sudah Dibayar *"
                    name="dibayar"
                    onChange={this.handleChange}
                    noValidate />
                  <div style={{ fontSize: 15, color: 'red' }}>
                    {this.validator.message('Harga Beli', this.state.dibayar, 'required')}
                  </div>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Jumlah
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="number"
                    value={this.state.quantity}
                    className=""
                    placeholder="Masukkan Quantity *"
                    name="quantity"
                    onChange={this.handleChange}
                    noValidate />
                  <div style={{ fontSize: 15, color: 'red' }}>
                    {this.validator.message('Quantity', this.state.quantity, 'required')}
                  </div>
                </Col>
              </Form.Group>

              
              <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button type="submit" >Tambah</Button>
                </Col>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </div>
    )
  }
}
