const Joi = require("joi");

const schema = {
    pembelian : Joi.object({
        nama_barang : Joi.string().required(),
        satuan : Joi.string().uppercase().required(),
        harga_beli : Joi.number().min(1).required(),
        jumlah : Joi.number().min(1).required(),
        tgl_pembelian : Joi.date().iso().required(),
        kd_supplier : Joi.number().required(),
        status : Joi.number().max(1).min(0).required(),
        loggedIn: Joi.boolean()
    })
}

module.exports = schema