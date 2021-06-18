
module.exports = {
	get: (con,callback) => {
		con.query("SELECT * FROM supplier", callback)
	},

	getAll : (con, data, limit, offset, callback) => {
		data.sort == '' || data.sort == null ? sort = 'asc' : sort = data.sort
		data.orderBy == '' || data.orderBy == null ? orderBy = 'kd_supplier' : orderBy = data.orderBy
		data.search == null ? search = '' : search = data.search

        con.query(`SELECT * FROM supplier WHERE kd_supplier LIKE '%${search}%' OR nama_supplier LIKE '%${search}%' OR alamat LIKE '%${search}%' ORDER BY ${orderBy} ${sort}`, callback)
    },

	getById: (con, kd_supplier, callback) => {
		con.query(`SELECT * FROM supplier WHERE kd_supplier = ${kd_supplier}`, callback)
	},

	add: (con, data, callback) => {
		con.query(`INSERT INTO supplier SET nama_supplier = '${data.nama_supplier}', alamat = '${data.alamat}'`, callback)
	},
	
	update: (con, data, kd_supplier, res, callback) => {	
		con.query(`SELECT * FROM supplier WHERE kd_supplier = ${kd_supplier}`, (e, rows) => {
			if(e) throw e
			if(rows == 0) return res.send('id supplier tidak ditemukan.', 404)	
			con.query(`UPDATE supplier SET nama_supplier = '${data.nama_supplier}', alamat = '${data.alamat}' WHERE kd_supplier = ${kd_supplier}`, callback)
		})
	},

	delete: (con, kd_supplier, res, callback) => {
		con.query(`SELECT * FROM supplier WHERE kd_supplier = ${kd_supplier}`, (e, rows) => {
			if(e) throw e
			if(rows == 0) return res.send('id supplier tidak ditemukan.', 404)

			con.query(`SELECT kd_supplier FROM pembelian WHERE kd_supplier = ${kd_supplier}`, (e, result)=> {
				if(e) throw e
				if(result.length == 0){
					con.query(`DELETE FROM supplier WHERE kd_supplier = ${kd_supplier}`, callback)
				} else {
					res.send('kd_supplier sudah terpakai')
				}
			})
		})
	}

}