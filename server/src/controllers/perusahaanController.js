const perusahaan = require('../models/Perusahaan')

module.exports = {
	getAll : (req, res) => {
        let page = req.query.page || 1
        let limit = req.query.limit || 3
        let offset = ( page - 1 ) * limit
        
        perusahaan.getAll(req.con, req.query, limit, offset, (err, rows) => {
            if(err) throw (err)
            perusahaan.get(req.con, (err, results) => {
                if(err) throw (err)
                const pageLimit = Math.ceil(results.length/parseInt(limit))
                res.json({page: `${page} of ${pageLimit}`, result:rows.length, data: rows})
            })
        })
    },

	getById: (req, res) => {
		perusahaan.getById(req.con, req.params.kd_perusahaan, (err, rows) => {
			if(err) throw err
			res.json(rows)
		})
	},

	add: (req, res) => {
		perusahaan.add(req.con, req.body, (err, rows) => {
			if(err) throw err
			res.send('add new perusahaan success.', 200)
		})
	},

	update: (req, res) => {
		perusahaan.update(req.con, req.body, req.params.kd_perusahaan, res, (err, rows) => {
			if(err) throw err
			res.send('success.', 200)
		})
	},

	delete: (req, res) => {
		perusahaan.delete(req.con, req.params.kd_perusahaan, res, (err, rows) => {
			if(err) return res.send(err.sqlMessage, 400)
			res.send('success.', 200)
		})
	}


}