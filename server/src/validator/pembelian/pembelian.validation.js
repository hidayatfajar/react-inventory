const { pembelian } = require('./pembelian.schema')

module.exports = {
    pembelianValidation: async(req, res, next) => {
		const value = await pembelian.validate(req.body)
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