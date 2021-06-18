const joi = require('joi')

const schema = {
	perusahaan: joi.object({	
		nama_perusahaan: joi.string().required(),
		alamat: joi.string().required(),
		pemilik: joi.string().required(),
		kota: joi.string().required()
	})
}

module.exports = schema