const express = require('express')
const router = express.Router()
const supplierController = require('../controllers/supplierController')
const { addSupplierValidation } = require('../validator/supplier/supplier.validation')

// Router Supplier
router.get('/supplier', supplierController.getAll)
router.get('/supplier/:kd_supplier', supplierController.getById)
router.post('/tambah/supplier', addSupplierValidation, supplierController.add)
router.put('/ubah/supplier/:kd_supplier', addSupplierValidation, supplierController.update)
router.delete('/hapus/supplier/:kd_supplier', supplierController.delete)
module.exports = router