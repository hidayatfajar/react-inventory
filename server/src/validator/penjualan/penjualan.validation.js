const { penjualan } = require('./penjualan.schema')

module.exports = {
	addPenjualanValidation: async(req, res, next) => {
		const value = await penjualan.validate(req.body)
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