const Supplier = require('../models/Supplier')

module.exports = {
	getAll : (req, res) => {
        let page = req.query.page || 1
        let limit = req.query.limit || 3
        let offset = ( page - 1 ) * limit
        
        Supplier.getAll(req.con, req.query, limit, offset, (err, rows) => {
            if(err) throw (err)
            Supplier.get(req.con, (err, results) => {
                if(err) throw (err)
                const pageLimit = Math.ceil(results.length/parseInt(limit))
                res.json({page: `${page} of ${pageLimit}`, result:rows.length, data: rows})
            })
        })
    },

	getById: (req, res) => {
		Supplier.getById(req.con, req.params.kd_supplier, (err, rows) => {
			if(err) throw err
			res.json(rows)
		})
	},

	add: (req, res) => {
		Supplier.add(req.con, req.body, (err, rows) => {
			if (err) throw err
			res.send('add new supplier success.', 200)
		})
	},

	update: (req, res) => {
		Supplier.update(req.con, req.body, req.params.kd_supplier, res, (err, rows) => {
			if (err) throw err
			res.send('success.', 200)
		})
	},

	delete: (req, res) => {
		Supplier.delete(req.con, req.params.kd_supplier, res, (err, rows) => {
			if (err) return res.send(err.sqlMessage, 400)
			res.send('success.', 200)
		})
	}


}