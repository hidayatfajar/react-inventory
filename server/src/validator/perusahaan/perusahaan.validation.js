const { perusahaan } = require('./perusahaan.schema')

module.exports = {
	perusahaanValidation: async(req, res, next) => {
		const value = await perusahaan.validate(req.body)
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