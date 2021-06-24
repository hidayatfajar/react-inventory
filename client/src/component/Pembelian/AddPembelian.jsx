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

export default class AddPembelian extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    const login = JSON.parse(localStorage.getItem('login'))
    let loggedIn = true
    if (login == null) {
      loggedIn = false
    }
    this.state = {
      nama_barang: '',
      satuan: '',
      harga_beli: '',
      jumlah: '',
      tgl_pembelian: '',
      kd_supplier: '',
      status: '',
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
    if (this.validator.allValid()) {
    axios.post("http://localhost:8000/pembelian", this.state)
      .then((result) => {
        console.log(result.data);
        this.setState({
          nama_barang: "",
          satuan: "",
          harga_beli: "",
          tgl_pembelian: "",
          kd_supplier: "",
          status: ""
        })
        this.validator.hideMessages();
          // this.props.onSubmit(this.state);
          console.log(this.state);
        if (result.data.error == false) {
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
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
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
              <Link to={"/pembelian/"}><Button className="mr-2" variant="primary" block=""><FontAwesomeIcon icon={faLongArrowAltLeft} /></Button></Link>
            </Col><br />
            <Form onSubmit={this.handleSubmit} noValidate>

              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Nama Barang
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"

                    value={this.state.nama_barang}
                    className=""
                    placeholder="Masukkan Nama Barang *"
                    name="nama_barang"
                    id="nama_barang"
                    noValidate
                    onChange={this.handleChange}
                  />
                  <div style={{ fontSize: 15, color: 'red' }}>
                    {this.validator.message('Nama Barang', this.state.nama_barang, 'required')}
                  </div>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  satuan
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    value={this.state.satuan}
                    className=""
                    placeholder="Masukkan Satuan *"
                    name="satuan"
                    id="satuan"
                    onChange={this.handleChange}
                    noValidate />
                  <div style={{ fontSize: 15, color: 'red' }}>
                    {this.validator.message('Satuan', this.state.satuan, 'required')}
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
                    value={this.state.harga_beli}
                    className=""
                    placeholder="Masukkan Harga Beli *"
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
                  Jumlah
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="number"
                    value={this.state.jumlah}
                    className=""
                    placeholder="Masukkan Jumlah *"
                    name="jumlah"
                    onChange={this.handleChange}
                    noValidate />
                  <div style={{ fontSize: 15, color: 'red' }}>
                    {this.validator.message('Jumlah', this.state.jumlah, 'required')}
                  </div>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Tanggal Pembelian
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="date"
                    value={this.state.tgl_pembelian}
                    className=""
                    placeholder="Masukkan Tanggal Pembelian *"
                    name="tgl_pembelian"
                    onChange={this.handleChange}
                    noValidate />
                  <div style={{ fontSize: 15, color: 'red' }}>
                    {this.validator.message('Tanggal Pembelian', this.state.tgl_pembelian, 'required')}
                  </div>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Kode Suplier
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="number"
                    value={this.state.kd_supplier}
                    className=""
                    placeholder="Masukkan Kode Supplier *"
                    name="kd_supplier"
                    onChange={this.handleChange}
                    noValidate />
                  <div style={{ fontSize: 15, color: 'red' }}>
                    {this.validator.message('Kode Supplier', this.state.kd_supplier, 'required')}
                  </div>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm={2}>Status</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    as="select"
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
