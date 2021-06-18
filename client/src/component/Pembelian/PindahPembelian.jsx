// Libraries
import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from "react-router-dom";
import { Button, Navbar, Nav, Container, Col, Row, Form, NavDropdown, Card } from "react-bootstrap";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import SideBar from '../Pages/SideBar'
import ToolkitProvider, { SearchBar, Search, defaultSorted } from "react-bootstrap-table2-toolkit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'

// Component
import TambahPembelian from './TambahPembelian'

import './Pembelian.css'

export default class PindahPembelian extends Component {
  constructor(props) {
    super(props)
    const token = localStorage.getItem("token")

    let loggedIn = true
    if (token == null) {
      loggedIn = false
    }

    this.state = {
      data: [],
      nama_barang: "",
      satuan: '',
      harga_beli: '',
      jumlah: '',
      tgl_pembelian: '',
      kd_supplier: '',
      status: '',

      loggedIn,
    };
  }

  getPostAPI = () => {
    axios.get('http://localhost:8000/pembelian')
      .then((result) => {
        console.log(result)
        console.log(result.data.data)
        this.setState({
          data: result.data.data
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


  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state)
    axios.post("http://localhost:8000/pembelian", this.state)
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


  componentDidMount() {
    this.getPostAPI();

  }
  handleRemove = (kd_barang) => {
    axios.delete(`http://localhost:8000/hapus/barang/${kd_barang}`)
      .then((result) => {
        Swal.fire(
          'Success',
          'Your data has been deleted!',
          'success'
        );
        this.getPostAPI();
      })
      .catch(err => {
        Swal.fire(
          'error',
          'cant delete the id!',
          'error'
        );
        console.log(err)
      })
  }
  handleClick = (e) => {
    localStorage.removeItem("token");
    this.props.history.push("/login");
  };
  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/login" />;
    }

    const customTotal = (from, to, size) => (
      <span className="react-bootstrap-table-pagination-total">
        Showing {from} to {to} of {size} Results
      </span>
    );
    const data = this.state.data;
    const options = {
      paginationSize: 4,
      pageStartIndex: 0,
      alwaysShowAllBtns: true, // Always show next and previous button
      // withFirstAndLast: false, // Hide the going to First and Last page button
      // hideSizePerPage: true, // Hide the sizePerPage dropdown always
      // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
      firstPageText: "First",
      prePageText: "Back",
      nextPageText: "Next",
      lastPageText: "Last",
      nextPageTitle: "First page",
      prePageTitle: "Pre page",
      firstPageTitle: "Next page",
      lastPageTitle: "Last page",
      showTotal: true,
      paginationTotalRenderer: customTotal,
      disablePageTitle: true,
      sizePerPageList: [
        {
          value: 5,
        },
      ], // A numeric array is also available. the purpose of above example is custom the text
    };
    const { SearchBar } = Search;
    const columns = [
      {
        dataField: "tgl_pembelian",
        text: "Tanggal Pembelian",
        sort: true,
      },
      {
        dataField: "kd_admin",
        text: "Satuan",
      },
      {
        dataField: "kd_supplier",
        text: "Harga Jual",
      },
      {
        dataField: "total_pembelian",
        text: "Harga Beli",
      },
      {
        dataField: "Link",
        text: "Action",
        formatter: (rowContent, row, props) => {
          return (
            <div>
              <Container>
                <Row>

                  <Col md={-2}>
                    <Link to={"/view/barang/" + row.kd_barang}><Button className="mr-2" variant="success" block=""><FontAwesomeIcon icon={faEye} /></Button></Link>
                  </Col>
                  <Col xs={-1}>
                    <Link to={"/update/barang/" + row.kd_barang}><Button className="mr-2" variant="warning" block=""><FontAwesomeIcon icon={faEdit} /></Button></Link>
                  </Col>
                  <Col xs={-1}>
                    <Button onClick={() => this.handleRemove(row.kd_barang)} variant="danger" block=""><FontAwesomeIcon icon={faTrashAlt} /></Button>
                  </Col>
                </Row>
              </Container>
            </div >
          )
        }
      }
    ];

    const defaultSorted = [
      {
        dataField: "name",
        order: "desc",
      },
    ];

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
        <Container>

          <ToolkitProvider
            keyField="id"
            data={data}
            columns={columns}
            search>
            {(props) => (
              <div className="back">
                <div>

                  <Row>

                    <Col xs={2}>
                      <Link to="/add/barang"><Button className="mr-2" variant="primary" block="">Create</Button></Link>
                    </Col>
                    {/* <Col xs={-1}>
                        <Button className="mr-2" variant="warning" block="">Update</Button>
                      </Col>
                      <Col xs={-1}>
                        <Button variant="danger" block="">Delete</Button>
                      </Col> */}

                    <Col>
                      <div className="float-right">
                        <SearchBar {...props.searchProps} />
                      </div>
                    </Col>
                  </Row>
                </div>

                <br />

                <BootstrapTable {...props.baseProps}
                  boostrtap4
                  keyField="id"
                  data={data}
                  columns={columns}
                  defaultSorted={defaultSorted}
                  pagination={paginationFactory(options)}
                  headerWrapperClasses="foo"
                />
              </div>
            )}
          </ToolkitProvider>



          {/* Create data */}

          <Card
            style={{ width: '57rem' }}
            className="crd"
          >
            <Card.Body>

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
                    {/* <div style={{ fontSize: 15, color: 'red' }}>
                    {this.validator.message('Kode Barang', this.state.kd_barang, 'required')}
                    </div> */}
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
                      placeholder="Masukkan Satuan"
                      name="satuan"
                      id="satuan"
                      onChange={this.handleChange}
                      noValidate />
                    {/* <div style={{ fontSize: 15, color: 'red' }}>
                    {this.validator.message('Nama Barang', this.state.nama_barang, 'required')}
                    </div> */}
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
                      placeholder="Masukkan Harga Beli"
                      name="harga_beli"
                      onChange={this.handleChange}
                      noValidate />
                    {/* <div style={{ fontSize: 15, color: 'red' }}>
                    {this.validator.message('Satuan', this.state.satuan, 'required')}
                    </div> */}
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
                      placeholder="Masukkan Jumlah"
                      name="jumlah"
                      onChange={this.handleChange}
                      noValidate />
                    {/* <div style={{ fontSize: 15, color: 'red' }}>
                    {this.validator.message('Harga Jual', this.state.harga_jual, 'required')}
                    </div> */}
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
                      placeholder="Masukkan Tanggal Pembelian"
                      name="tgl_pembelian"
                      onChange={this.handleChange}
                      noValidate />
                    {/* <div style={{ fontSize: 15, color: 'red' }}>
                    {this.validator.message('Harga Beli', this.state.harga_beli, 'required')}
                    </div> */}
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
                      placeholder="Masukka Kode Suplier"
                      name="kd_supplier"
                      onChange={this.handleChange}
                      noValidate />
                    {/* <div style={{ fontSize: 15, color: 'red' }}>
                    {this.validator.message('Stok', this.state.stok, 'required')}
                    </div> */}
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
                    {/* <div style={{ fontSize: 15, color: 'red' }}>
                    {this.validator.message('Status', this.state.status, 'required')}
                    </div> */}
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
          {/* <TambahPembelian/> */}
        </Container>
      </div>
    );
  }
}
