import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';


import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import './component/Assets/Admin.css'
import './component/Assets/Create.css'
import './component/Assets/Homepage.css'
import './component/Assets/Signup.css'
import './component/Assets/Login.css'
import './component/Assets/SideBar.css'

import AddBarang from './component/Barang/AddBarang'
import DataBarang from './component/Barang/DataBarang'
import UpdateBarang from './component/Barang/UpdateBarang'
import ViewBarang from './component/Barang/ViewBarang'

import Login from './component/Pages/Login';
import Signup from './component/Pages/Signup';
import Welcome from './component/Pages/Welcome';
import Homepage from './component/Pages/Homepage';

import DataSupplier from './component/Supplier/DataSupplier'
import ViewSupplier from './component/Supplier/ViewSupplier';
import UpdateSupplier from './component/Supplier/UpdateSupplier';
import AddSupplier from './component/Supplier/AddSupplier';

import ViewPerusahaan from './component/Perusahaan/ViewPerusahaan';
import DataPerusahaan from './component/Perusahaan/DataPerusahaan';
import UpdatePerusahaan from './component/Perusahaan/UpdatePerusahaan';
import AddPerusahaan from './component/Perusahaan/AddPerusahaan'

import DataPembelian from './component/Pembelian/DataPembelian'
import AddPembelian from './component/Pembelian/AddPembelian' 
import ViewPembelian from './component/Pembelian/ViewPembelian';
import LaporanPenjualan from './component/Laporan/LaporanPenjualan'
import DetailPembelian from './component/Pembelian/DetailPembelian';
          
import DataPenjualan from './component/Penjualan/DataPenjualan'
import AddPenjualan from './component/Penjualan/AddPenjualan'
import ViewPenjualan from './component/Penjualan/ViewPenjualan'
import DetailPenjualan from './component/Penjualan/DetailPenjualan';

ReactDOM.render(
  
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route exact path="/" component={Welcome} />
                    <Route exact path="/home" component={Homepage} />


                    <Route path="/perusahaan" component={DataPerusahaan} />
                    <Route path="/view/perusahaan/:id" component={ViewPerusahaan} />
                    <Route exact path="/add/perusahaan" component={AddPerusahaan} />
                    <Route exact path="/update/perusahaan/:id" component={UpdatePerusahaan} />


                    <Route exact path="/barang" component={DataBarang} />
                    <Route path="/view/barang/:id" component={ViewBarang} />
                    <Route exact path="/add/barang" component={AddBarang} />
                    <Route exact path="/update/barang/:id" component={UpdateBarang} />

                    <Route exact path="/supplier" component={DataSupplier} />
                    <Route exact path="/view/supplier/:id" component={ViewSupplier} />
                    <Route exact path="/add/supplier" component={AddSupplier} />
                    <Route exact path="/update/supplier/:id" component={UpdateSupplier} />
                    
                    <Route exact path="/pembelian" component={DataPembelian} />
                    <Route exact path="/view/pembelian/:id" component={ViewPembelian} />
                    <Route exact path="/add/pembelian" component={AddPembelian} />
                    <Route exact path="/detail/pembelian" component={DetailPembelian} />

                    <Route exact path="/penjualan" component={DataPenjualan} />
                    <Route exact path="/view/penjualan/:id" component={ViewPenjualan} />
                    <Route exact path="/add/penjualan" component={AddPenjualan} />
                    <Route exact path="/detail/penjualan" component={DetailPenjualan} />
                    <Route exact path="/laporan/penjualan" component={LaporanPenjualan} />

                    {/* <Route path="/table" component={Table} /> */}


                </Switch>
            </BrowserRouter>,
  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
