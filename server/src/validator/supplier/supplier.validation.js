const { supplier } = require('./supplier.schema')

module.exports = {
	addSupplierValidation: async(req, res, next) => {
		const value = await supplier.validate(req.body)
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