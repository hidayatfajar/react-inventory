
module.exports = {
	get: (con,callback) => {
		con.query("SELECT * FROM perusahaan", callback)
	},

	getAll : (con, data, limit, offset, callback) => {
		data.sort == '' || data.sort == null ? sort = 'asc' : sort = data.sort
		data.orderBy == '' || data.orderBy == null ? orderBy = 'kd_perusahaan' : orderBy = data.orderBy
		data.search == null ? search = '' : search = data.search

        con.query(`SELECT * FROM perusahaan WHERE kd_perusahaan LIKE '%${search}%' OR nama_perusahaan LIKE '%${search}%' OR alamat LIKE '%${search}%' OR pemilik LIKE '%${search}%' OR kota LIKE '%${search}%' ORDER BY ${orderBy} ${sort}`, callback)
    },

	getById: (con, kd_perusahaan, callback) => {
		con.query(`SELECT * FROM perusahaan WHERE kd_perusahaan = ${kd_perusahaan}`, callback)
	},

	add: (con, data, callback) => {
		con.query(`INSERT INTO perusahaan SET nama_perusahaan = '${data.nama_perusahaan}', alamat = '${data.alamat}', pemilik = '${data.pemilik}', kota = '${data.kota}'`, callback)
	},
	
	update: (con, data, kd_perusahaan, res, callback) => {	
		con.query(`SELECT * FROM perusahaan WHERE kd_perusahaan = ${kd_perusahaan}`, (err, rows) => {
			if(err) throw err
			if(rows == 0) return res.send('kd_perusahaan perusahaan tidak ditemukan.', 404)
			con.query(`UPDATE perusahaan SET nama_perusahaan = '${data.nama_perusahaan}', alamat = '${data.alamat}', pemilik = '${data.pemilik}', kota = '${data.kota}' WHERE kd_perusahaan = ${kd_perusahaan}`, callback)
		})
	},

	delete: (con, kd_perusahaan, res, callback) => {
		con.query(`SELECT * FROM perusahaan WHERE kd_perusahaan = ${kd_perusahaan}`, (err, rows) => {
			if(err) throw err
			if(rows == 0) return res.send('kd_perusahaan perusahaan tidak ditemukan.', 404)
			con.query(`DELETE FROM perusahaan WHERE kd_perusahaan = ${kd_perusahaan}`, callback)
		})
	}

}