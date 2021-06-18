const { barang } = require('./barang.schema')

module.exports = {
	addBarangValidation: async(req, res, next) => {
		const value = await barang.validate(req.body)
		if(value.error){
			res.json({
				status: 0,
				message: value.error.details[0].message
			})
		}else {
			next()
		}
	}
}