module.exports = {
    get : (con, callback) => {
        con.query(`SELECT kd_admin, nama, email, gambar FROM admin`, callback)
    },

    getAll : (con, data, limit, offset, callback) => {
        data.sort == '' || data.sort == null ? sort = 'asc' : sort = data.sort
		data.orderBy == '' || data.orderBy == null ? orderBy = 'kd_admin' : orderBy = data.orderBy
		data.search == null ? search = '' : search = data.search

        const query = `SELECT kd_admin, nama, email, gambar FROM admin WHERE kd_admin LIKE '%${search}%' OR nama LIKE '%${search}%' OR email LIKE '%${search}%' ORDER BY ${orderBy} ${sort} LIMIT ${limit} OFFSET ${offset}`
        con.query(query, callback)
    },

    getById : (con, id, callback) => {
        const query = `SELECT * FROM admin WHERE kd_admin = ${id}`
        con.query(query, callback)
    },

    update : (con, data, id, res, callback) => {
        con.query(`SELECT * FROM admin WHERE kd_admin = ${id}`, (e, rows) => {
			if(e) throw e
			if(rows == 0) return res.send('id admin tidak ditemukan.', 404)	
			const query = `UPDATE admin SET nama = '${data.nama}', password = '${data.password}', email = '${data.email}' WHERE kd_admin = ${id}`
			con.query(query, callback)
        })
    },

    delete : (con, id, res, callback) => {
        con.query(`SELECT * FROM admin WHERE kd_admin = ${id}`, (e, rows) => {
			if(e) throw e
			if(rows == 0) return res.send('id admin tidak ditemukan.', 404)
        const query = `DELETE FROM admin WHERE kd_admin = ${id}`
        con.query(query, callback)
        })
    }
}