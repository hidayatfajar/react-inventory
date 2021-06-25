// Libraries
import React, { Component } from 'react'
import axios from 'axios'
import {Redirect , Link } from "react-router-dom";
import { Button, Navbar, Nav, Container, Col, Row, Form, NavDropdown } from "react-bootstrap";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import SideBar from '../Pages/SideBar'
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import Swal from 'sweetalert2'

// Component


export default class Pembelian extends Component {
  constructor(props) {
    super(props)
    const login = JSON.parse(localStorage.getItem('login'))

    let loggedIn = true
    if (login == null) {
      loggedIn = false
    }

    this.state = {
      data: [],
      loggedIn,
      awal: "",
      akhir: ""
    };
  }

  handleSearch = e => {
    console.log(this.state.awal)
    console.log(this.state.akhir)
    axios.get(`http://localhost:8000/laporan/penjualan?awal=${this.state.awal}&akhir=${this.state.akhir}`)
    .then((response) => {
      console.log(response)
      this.setState({
        data: response.data.data
      });
      })
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state.awal)
  }

  getPostAPI = () => {
    axios.get(`http://localhost:8000/penjualan`)
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
  handleClick = (e) => {
    localStorage.removeItem("token");
    this.props.history.push("/login");
  };
  render() {
    const login = JSON.parse(localStorage.getItem('login'))
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
    const columns = [
      {
        dataField: "kd_penjualan",
        text: "Kode Penjualan",
        sort: true,
      },
      {
        dataField: "tgl_penjualan",
        text: "Tanggal Penjualan",
      },
      {
        dataField: "kd_admin",
        text: "Kode Admin",
      },
      {
        dataField: "dibayar",
        text: "Dibayar",
      },
      {
        dataField: "total_penjualan",
        text: "Total Penjualan",
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
          <Navbar.Brand>Ourflow</Navbar.Brand>
          <Form inline>

            <Nav>

              <NavDropdown title={login.nama} id="basic-nav-dropdown">
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
                    <Col xs={3}>
                    <Form.Control type="date" name='awal' id='awal' value={this.state.awal} onChange={this.handleChange} />
                    </Col>
                    <Col xs="auto"><h2>-</h2></Col>
                    <Col xs={3}>
                    <Form.Control type="date" name='akhir' id='akhir' value={this.state.akhir} onChange={this.handleChange} />
                    </Col>
                    <Col>
                    <Button onClick={this.handleSearch}>Cari</Button>
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

          {/* <TambahPembelian/> */}
        </Container>
      </div>
    );
  }
}
