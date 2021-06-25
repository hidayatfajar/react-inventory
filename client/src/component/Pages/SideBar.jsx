import React, { Component, Fragment } from 'react'
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faStoreAlt, faShoppingBag, faArchive, faClipboardList, faBuilding, faCode } from '@fortawesome/free-solid-svg-icons'
import '../Assets/SideBar.css'

export default class SideBar extends Component {


  handleClick = e => {
    localStorage.removeItem("token")
    this.props.history.push("/")
  }
  render() {
    const data = JSON.parse(localStorage.getItem('login'))
    return (
      <Fragment>


        {/* SideBar */}

        <div class="sidenav">
          <center>
            <i class="fal fa-4x">
              <FontAwesomeIcon icon={faCode} />
            </i>
            {/* <p>{this.state.title}</p> */}
            <br />
            <div style={{ color: 'whitesmoke' }}>
              <h5>{data.nama}</h5>
            </div>
          </center>
          <hr />

          <Link to="/home" >
            <h5 className="dash"> <FontAwesomeIcon icon={faChartLine} />{' '}Dashboard  </h5>
          </Link>

          <Link to="/barang" >
            <h5 className="brg"> <FontAwesomeIcon icon={faArchive} />{' '} <span className="space">Data Barang </span>  </h5>
          </Link>

          <Link to="/supplier" >
            <h5 className="spl"> <FontAwesomeIcon icon={faClipboardList} />{' '} <span className="space"> Data Suplier </span> </h5>
          </Link>

          <Link to="/perusahaan" >
            <h5 className="dpr"> <FontAwesomeIcon icon={faBuilding} />{' '} <span className="space"> Data Perusahaan </span> </h5>
          </Link>

          <div class="dropdown" defaultActiveKey="0">
            <div class="dropbtn"> <h5 className="pjl"><FontAwesomeIcon icon={faStoreAlt} />{' '}Penjualan  </h5></div>

            <div class="dropdown-content" eventKey="0">
              {/* eslint-disable-next-line*/}
              <a><Link to="/penjualan" >
                <b>Data Penjualan</b>
              </Link>
              </a>
              {/* eslint-disable-next-line*/}
              <a><Link to="/laporan/penjualan" >
                <b>Laporan Penjualan</b>
              </Link>
              </a>

            </div>
          </div>

          <div class="dropdown" defaultActiveKey="1">
            <div class="dropbtn"> <h5 className="pbl"><FontAwesomeIcon icon={faShoppingBag} />{' '}Pembelian </h5></div>

            <div class="dropdown-content" eventKey="1">
              {/* eslint-disable-next-line*/}
              <a><Link to="/pembelian" >
                <b>Data Pembelian</b>
              </Link>
              </a>
              {/* eslint-disable-next-line*/}
              <a><Link to="/laporan/pembelian" >
                <b>Laporan Pembelian</b>
              </Link>
              </a>

            </div>
          </div>


        </div>

      </Fragment>
    )
  }
}