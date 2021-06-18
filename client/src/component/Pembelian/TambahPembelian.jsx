import React, { Component } from 'react'
import axios from 'axios'
import { Container, Button, Col, Row, div } from 'react-bootstrap'

import './Pembelian.css'


export default class TambahPembelian extends Component {
    state = {
        pembelian: {
            nama_barang : '',
            satuan : '',
            harga_beli : '',
            jumlah : '',
            tgl_pembelian : '',
            kd_supplier : '',
            status : ''
        }
    }

    postDataToAPI = () => {
        axios.post('http://localhost:8000/pembelian', this.state.pembelian)
            .then((res) => {
                console.log(res);
                // this.getPostAPI();
            }, (err) => {
                console.log('error', err);
            })

    }
    handleFormChange = (event) => {
        // console.log('form change', event.target)
        let pembelianNew = { ...this.state.pembelian };
        pembelianNew[event.target.name] = event.target.value;
        this.setState({
            pembelian: pembelianNew
            // }, () => {
            // console.log('value obj formBlogPost: ', this.state.formBlogPost);
        })
    }

    handleSubmit = (e) => {
        this.postDataToAPI();

        e.preventDefault();
    }

    render() {
        return (
            <div>
                
                <div className="back">
                        <p className="title">Tambah Data Pembelian</p>
                        <div>
                            <div className="for" >
                                <form >
                                    <label htmlFor="nama_barang">Nama Barang</label>
                                    <input type="text" name="nama_barang" placeholder="Masukkan Nama Barang" onChange={this.handleFormChange} />

            	                    <label htmlFor="satuan">Satuan</label>
                                    <input type="text" name="satuan" placeholder="Masukkan Satuan" onChange={this.handleFormChange} />

                                    <label htmlFor="harga_beli">Harga Beli</label>
                                    <input type="number" name="harga_beli" placeholder="Masukkan Harga Beli" onChange={this.handleFormChange} min="1" />

                                    <label htmlFor="jumlah">Jumlah</label>
                                    <input type="number" name="jumlah" placeholder="Masukkan Jumlah" onChange={this.handleFormChange} min="1" />

                                    <label htmlFor="tgl_pembelian">Tanggal Pembelian</label>
                                    <input type="date" name="tgl_pembelian" placeholder="Masukkan Tanggal Pembelian" onChange={this.handleFormChange} />

                                    <label htmlFor="kd_supplier">Kode Suplier</label>
                                    <input type="number" name="kd_supplier" placeholder="Masukkan Kode Suplier" onChange={this.handleFormChange} min="0" />
            	                    
                                    <label htmlFor="status">Status</label>
                                    <input type="number" name="status" placeholder="Masukkan Status" onChange={this.handleFormChange} min="0" max="1" />

                                    <Button variant="outline-primary" onClick={this.handleSubmit} block>Tambah</Button>{' '}
                                </form>
                            </div>
                        </div>
                    </div>

            </div>
        )
    }
}
