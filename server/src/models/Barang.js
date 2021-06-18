const mysql = require('mysql')
const pagination = require('../middleware/pagination')

module.exports = {
	get: (con,callback) => {
		con.query("SELECT * FROM barang", callback)
    },
    
	getAll : (con, data, limit, offset, callback) => {
		data.sort == '' || data.sort == null ? sort = 'asc' : sort = data.sort
		data.orderBy == '' || data.orderBy == null ? orderBy = 'kd_barang' : orderBy = data.orderBy
		data.search == null ? search = '' : search = data.search

        con.query(`SELECT * FROM barang WHERE kd_barang LIKE '%${search}%' OR nama_barang LIKE '%${search}%' OR satuan LIKE '%${search}%' OR status LIKE '%${search}%' OR stok LIKE '%${search}%'`, callback)

    },

	getById: (con, id, callback) => {
		const query = `SELECT * FROM barang WHERE kd_barang = '${id}'`
		con.query(query, callback)
	},

	add: (con, data, callback) => {
		const query = `INSERT INTO barang SET
						kd_barang = '${data.kd_barang}',
						nama_barang = '${data.nama_barang}',
						satuan = '${data.satuan}',
						harga_jual = ${data.harga_jual},
						harga_beli = ${data.harga_beli},
						stok = ${data.stok},
						status = ${data.status}`
		con.query(query, callback)
	},

	update: (con, data, id, res, callback) => {
		con.query(`SELECT * FROM barang WHERE kd_barang = '${id}'`, (err, rows) => {
			if(err) throw err
			if(rows == 0) return res.send('id barang tidak ditemukan.', 404)
			const query = `UPDATE barang SET
					kd_barang = '${data.kd_barang}',
					nama_barang = '${data.nama_barang}',
					satuan = '${data.satuan}',
					harga_jual = ${data.harga_jual},
					harga_beli = ${data.harga_beli},
					stok = ${data.stok},
					status = ${data.status}
					WHERE kd_barang = '${id}'`
			con.query(query, callback)
		})
	},

	delete: (con, id, res, callback) => {
		con.query(`SELECT * FROM barang WHERE kd_barang = '${id}'`, (e, rows) => {
			if(e) throw e
			if(rows == 0) return res.send('id barang tidak ditemukan.', 404)
			const query = `DELETE FROM barang WHERE kd_barang = '${id}'`
			con.query(query, callback)
		})
	}
}