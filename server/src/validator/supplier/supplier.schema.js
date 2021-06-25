const joi = require('joi')

const schema = {
	supplier: joi.object({	
		nama_supplier: joi.string().required(),
		alamat: joi.string().required(),
		loggedIn : joi.boolean()
	})
}

module.exports = schema