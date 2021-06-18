const express = require('express')
const router = express.Router()
const admincontroller = require('../controllers/adminController')
const verifikasi = require('../middleware/verifikasi')

    router.get('/admin', verifikasi.verifikasiAdmin(), admincontroller.getAll)

    router.get('/admin/:id', admincontroller.getById)

    router.put('/ubah/admin/:id', admincontroller.update)

    router.delete('/hapus/admin/:id', admincontroller.delete)

module.exports = router