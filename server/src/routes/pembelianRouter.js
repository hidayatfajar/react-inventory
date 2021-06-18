const express = require('express')
const router = express.Router()
const pembelianController = require('../controllers/pembelianController')
const { pembelianValidation } = require('../validator/pembelian/pembelian.validation')

    router.get('/pembelian', pembelianController.getAll)

    router.get('/pembelian/:kd_pembelian', pembelianController.getById)

    router.get('/detail/pembelian', pembelianController.getAllDetail)

    router.get('/detail/pembelian/:id_pembelian', pembelianController.getDetailById)

    router.get('/barang_pembelian', pembelianController.getAllBarang)

    router.get('/laporan/pembelian', pembelianController.getLaporan)

    router.get('/barang_pembelian/:kd_barang_beli', pembelianController.getBarangById)

    router.post('/pembelian', pembelianValidation, pembelianController.transaction)

module.exports = router