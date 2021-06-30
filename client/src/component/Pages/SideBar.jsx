import React, { Component, Fragment } from 'react'
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Image} from 'react-bootstrap'
import { faChartLine, faStoreAlt, faShoppingBag, faArchive, faClipboardList, faBuilding, faCode } from '@fortawesome/free-solid-svg-icons'
import '../Assets/SideBar.css'
import image from '../Assets/Kodok Senyum.jpg'
import axios from 'axios'

export default class SideBar extends Component {
  constructor (props){
    super(props)
    this.state = {
      admin : ""
    }
  }


  handleClick = e => {
    localStorage.removeItem("token")
    this.props.history.push("/")
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
        this.setState({
          admin: res.data.data[0]
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  componentDidMount () {
    this.getAdmin()
  }

  render() {
    const data = JSON.parse(localStorage.getItem('login'))
    return (
      <Fragment>


        {/* SideBar */}

        <div class="sidenav">
          <center>
            <i class="fal fa-4x">
            <Image width={100} height={100} src={image} alt="INI GAMBAR" roundedCircle />
            </i>
            <br/>
            {/* <p>{this.state.title}</p> */}
            <br />
            <div style={{ color: 'whitesmoke' }}>
              <h5>{this.state.admin.nama}</h5>
            </div>
          </center>

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