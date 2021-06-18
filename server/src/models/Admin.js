

module.exports = {
    get : (con, callback) => {
        con.query(`SELECT kd_admin, nama, email, gambar FROM admin`, callback)
    },

    getAll : (con, data, limit, offset, callback) => {
        if(data.sort == '' || data.sort == null) {
            sort = 'asc'
        } else {
            sort = data.sort
        }
        if(data.orderBy == '' || data.orderBy == null) {
            orderBy = 'kd_admin'
        } else {
            orderBy = data.orderBy
        }
        const query = `SELECT kd_admin, nama, email, gambar FROM admin WHERE
                        kd_admin LIKE '%${data.search}%' OR
                        nama LIKE '%${data.search}%' OR
                        email LIKE '%${data.search}%'
                        ORDER BY ${orderBy} ${sort}
                        LIMIT ${limit} OFFSET ${offset}`
        con.query(query, callback)
    },

    getById : (con, id, callback) => {
        const query = `SELECT kd_admin, nama, email, gambar FROM admin WHERE kd_admin = ${id}`
        con.query(query, callback)
    },

    update : (con, data, id, res, callback) => {
        con.query(`SELECT * FROM admin WHERE kd_admin = ${id}`, (e, rows) => {
			if(e) throw e
			if(rows == 0) return res.send('id admin tidak ditemukan.', 404)	
			const query = `UPDATE admin SET
					nama = '${data.nama}',
					email = '${data.email}'
					WHERE kd_admin = ${id}`
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