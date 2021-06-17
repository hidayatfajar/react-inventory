import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import './component/Barang/AddBarang'
import './component/Barang/DataBarang'
import './component/Barang/UpdateBarang'
import './component/Barang/ViewBarang'


import Login from './Login';
import Signup from './Signup';

import Welcome from './Welcome';
import Logout from '../Sidebar/Logout';
import Admin from './DataPerusahaan';
import Admin1 from './Admin1';
import AddBarang from './AddBarang';
import SideBar from './SideBar';
import Homepage from './Homepage';
import AddPerusahaan from './AddPerusahaan';
import DataSupplier from './DataSupplier'
import ViewPerusahaan from './ViewPerusahaan';
import ViewSupplier from './ViewSupplier';
import ViewBarang from './ViewBarang';
import DataPerusahaan from './DataPerusahaan';
import DataBarang from './DataBarang';
import UpdateSupplier from './UpdateSupplier';
import UpdateBarang from './UpdateBarang';
import UpdatePerusahaan from './UpdatePerusahaan';
import AddSupplier from './AddSupplier';



export default class Config extends Component {
    render() {
        return (
            <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route exact path="/" component={Welcome} />
                    <Route exact path="/home" component={Homepage} />
                    <Route path="/logout" component={Logout} />


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

                    {/* <Route path="/table" component={Table} /> */}


                </Switch>
            </BrowserRouter>
                    </div >
                )
    }
}

