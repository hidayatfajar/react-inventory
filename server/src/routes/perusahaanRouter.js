const express = require('express')
const router = express.Router()
const perusahaanController = require('../controllers/perusahaanController')
const { perusahaanValidation } = require('../validator/perusahaan/perusahaan.validation')

// Router perusahaan
router.get('/perusahaan', perusahaanController.getAll)
router.get('/perusahaan/:kd_perusahaan', perusahaanController.getById)
router.post('/tambah/perusahaan', perusahaanValidation, perusahaanController.add)
router.put('/ubah/perusahaan/:kd_perusahaan', perusahaanValidation, perusahaanController.update)
router.delete('/hapus/perusahaan/:kd_perusahaan', perusahaanController.delete)
module.exports = router