// Libraries
import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from "react-router-dom";
import { Button, Navbar, Nav, Container, Col, Row, Form, NavDropdown } from "react-bootstrap";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import SideBar from '../Pages/SideBar'
import ToolkitProvider, {  Search } from "react-bootstrap-table2-toolkit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'

// Component

import './Pembelian.css'

export default class DataPembelian extends Component {
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
      admin : []
    };
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


  
  componentDidMount() {
    this.getPostAPI();
    this.getAdmin()

  }
  handleClick = (e) => {
    localStorage.removeItem("login");
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
    const { SearchBar } = Search;
    const columns = [
      {
        dataField: "kd_pembelian",
        text: "Kode Pembelian",
        sort: true,
      },
      {
        dataField: "tgl_pembelian",
        text: "Tanggal Pembelian",
      },
      {
        dataField: "kd_admin",
        text: "Kode Admin",
      },
      {
        dataField: "kd_supplier",
        text: "Kode Supplier",
      },
      {
        dataField: "total_pembelian",
        text: "Total Pembelian",
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
                    <Link to={"/view/pembelian/" + row.kd_pembelian}><Button className="mr-2" variant="success" block=""><FontAwesomeIcon icon={faEye} /></Button></Link>
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

                    <Col xs={1}>
                      <Link to="/add/pembelian"><Button className="mr-2" variant="primary" block="">Create</Button></Link>
                    </Col>
                    <Col xs={2}>
                      <Link to="/detail/pembelian"><Button className="mr-2" variant="secondary" block="">Detail</Button></Link>
                    </Col>
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

          {/* <TambahPembelian/> */}
        </Container>
      </div>
    );
  }
}
