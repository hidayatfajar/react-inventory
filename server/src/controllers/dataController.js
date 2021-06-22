const Barang = require('../models/Barang')

module.exports = {
	getAll: (req, res) => {
		let page = req.query.page || 1
        let limit = req.query.limit || 3
        let offset = ( page - 1 ) * limit
        
        Barang.getAll(req.con, req.query, limit, offset, (err, rows) => {
            if(err) throw (err)
            Barang.get(req.con, (err, results) => {
                if(err) throw (err)
                const pageLimit = Math.ceil(results.length/parseInt(limit))
                res.json({page: `${page} of ${pageLimit}`, result:rows.length, data: rows})
            })
        })
	},

	getById: (req, res) => {
		Barang.getById(req.con, req.params.id, (err, rows) => {
			if(err) throw err
			rows.length == 0 ? res.send('id barang tidak ditemukan.', 404) : res.json({ data: rows })
		})
	},

	add: (req, res) => {
		Barang.add(req.con, req.body, (err, rows) => {
			if(err){
				return res.send(err.sqlMessage, 400)
			}
			res.send('add new data success.', 201)
		})
	},

	update: (req, res) => {
		Barang.update(req.con, req.body, req.params.id, res, (err, rows) => {
			if(err) throw err
			res.send('success', 200)
		})
	},

	delete: (req, res) => {
		Barang.delete(req.con, req.params.id, res, (err, rows) => {
			if(err) return res.json({success: false, error: true, code:400})
			res.json({success: true, error: false, code: 200})
		})
	}
}