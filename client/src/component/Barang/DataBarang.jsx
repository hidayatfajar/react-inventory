// Libraries
import React, { Component } from 'react'
import axios from 'axios'
import {Redirect, Link } from "react-router-dom";
import { Button, Navbar, Nav, Container, Col, Row, Form, NavDropdown } from "react-bootstrap";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import SideBar from '../Pages/SideBar'
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// Component
import { faEdit, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'


export default class TableAdmin extends Component {
  constructor(props) {
    super(props)
    const login = JSON.parse(localStorage.getItem('login'))
    let loggedIn = true
    if (login == null) {
      loggedIn = false
    }

    this.state = {
      data: [],
      loggedIn
    };
  }

  getPostAPI = () => {
    axios.get('http://localhost:8000/barang?page=&limit=&search=&sort=')
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


  componentDidMount() {
    this.getPostAPI();

  }
  handleRemove = (kd_barang) => {
    axios.delete(`http://localhost:8000/hapus/barang/${kd_barang}`)
      .then((result) => {
        if(result.data.success){
          Swal.fire(
            'success',
            'Data berhasil dihapus.',
            'success'
          );
        } else {
          Swal.fire(
            'error',
            'Data tidak bisa dihapus.',
            'error'
          );
        }
        this.getPostAPI();
      })
      .catch(err => {
        Swal.fire(
          'error',
          'Terjadi kesalahan silahkan coba beberapa saat lagi',
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
        dataField: "kd_barang",
        text: "Kode Barang",
        sort: true,
      },
      {
        dataField: "nama_barang",
        text: "Nama Barang",
        sort: true,
      },
      {
        dataField: "satuan",
        text: "Satuan",
      },
      {
        dataField: "harga_jual",
        text: "Harga Jual",
      },
      {
        dataField: "harga_beli",
        text: "Harga Beli",
      },
      {
        dataField: "stok",
        text: "Stock",
      },
      {
        dataField: "status",
        text: "Status",
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
        </Container>
      </div>
    );
  }
}
