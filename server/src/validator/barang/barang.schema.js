const joi = require('joi')

const schema = {
	barang: joi.object({
		kd_barang: joi.string().required(),
		nama_barang: joi.string().required(),
		satuan: joi.string().required(),
		harga_jual: joi.number().required(),
		harga_beli: joi.number().required(),
		stok: joi.number().required(),
		status: joi.required(),
		loggedIn : joi.boolean()
	})
}

module.exports = schema