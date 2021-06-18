const express = require('express')
const router = express.Router()
const dataController = require('../controllers/dataController')
const { addBarangValidation } = require('../validator/barang/barang.validation')

// Router Barang
router.get('/barang', dataController.getAll)
router.get('/barang/:id', dataController.getById)
router.post('/tambah/barang', addBarangValidation, dataController.add)
router.put('/ubah/barang/:id', addBarangValidation, dataController.update)
router.delete('/hapus/barang/:id', dataController.delete)
module.exports = router