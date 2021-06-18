const pagination = require('../middleware/pagination')

module.exports = {
     get: (con,callback) => {
		con.query("SELECT * FROM penjualan", callback)
    },
    
	getAll : (con, data, limit, offset, callback) => {
		data.sort == '' || data.sort == null ? sort = 'asc' : sort = data.sort
		data.orderBy == '' || data.orderBy == null ? orderBy = 'kd_penjualan' : orderBy = data.orderBy
		data.search == null ? search = '' : search = data.search

        con.query(`SELECT * FROM penjualan WHERE kd_penjualan LIKE '%${search}%' OR tgl_penjualan LIKE '%${search}%' OR kd_admin LIKE '%${search}%' OR dibayar LIKE '%${search}%' OR total_penjualan LIKE '%${search}%' ORDER BY ${orderBy} ${sort}`, callback)

    },

    getById: (con, id_penjualan, callback) => {
        const query = `SELECT * FROM t_penjualan WHERE id_penjualan = '${id_penjualan}'`
		con.query(query, callback)
    },

     getDetail: (con,callback) => {
		con.query("SELECT * FROM d_pembelian", callback)
	},

	getAllDetail : (con, data, limit, offset, callback) => {
		data.sort == '' || data.sort == null ? sort = 'asc' : sort = data.sort
		data.orderBy == '' || data.orderBy == null ? orderBy = 'id_penjualan' : orderBy = data.orderBy
		data.search == null ? search = '' : search = data.search

        con.query(`SELECT * FROM d_penjualan WHERE id_penjualan LIKE '%${search}%' OR kd_penjualan LIKE '%${search}%' OR kd_barang LIKE '%${search}%' OR jumlah LIKE '%${search}%' OR subtotal LIKE '%${search}%' ORDER BY ${orderBy} ${sort}`, callback)
    },

    getDetailById: (con, id_pembelian, callback) => {
		con.query(`SELECT * FROM d_pembelian WHERE id_pembelian = ${id_pembelian}`, callback)
    },

    getLaporan: (con, data, callback) => {
		con.query(`SELECT * FROM penjualan WHERE tgl_penjualan BETWEEN '${data.awal}' AND '${data.akhir}'`, callback)
    },
    
    getDataLaporan : (con, res, data, awal, akhir, limit, offset, callback) => {
		data.sort == '' || data.sort == null ? sort = 'asc' : sort = data.sort
		data.orderBy == '' || data.orderBy == null ? orderBy = 'tgl_penjualan' : orderBy = data.orderBy
		data.search == null ? search = '' : search = data.search

        con.query(`SELECT * FROM penjualan WHERE tgl_penjualan BETWEEN '${awal}' AND '${akhir}'`, (err, rows) => {
			if(err) throw err
			let total_penjualan = rows.map((obj) => {
				return obj.total_penjualan
			})

			let total = total_penjualan.reduce((a,b) => {
				return a + b
			}, 0)
			
			res.send({result: rows.length, data: rows, total: total})
		})

    },

    transaction: (con, data, res) => {
        con.beginTransaction((e) => {
            if(e) throw e
            con.query(`SELECT stok FROM barang WHERE kd_barang = '${data.kd_barang}'`, (e, result) => {
                if(e) throw e

                let stok = result.map(function(obj) {
					return parseInt(obj.stok)
				})
            

            con.query(`SELECT harga_jual FROM barang WHERE kd_barang = '${data.kd_barang}'`, (e, result) => {
                if(e) throw e

                let harga = result.map(function(obj) {
                    return parseInt(obj.harga_jual)
                }) 
            con.query(`SELECT kd_admin FROM akses_token`, (err, result) => 
            {
                if(err) throw err
                let kd_admin = result.map((obj) => {
                    return parseInt(obj.kd_admin)
                })

                kd_admin = kd_admin[kd_admin.length - 1]

             con.query('SELECT kd_admin FROM admin WHERE kd_admin = ?', [kd_admin], (e, result) => {
					if(e) throw e
					let kd_admin = result.map((obj) => {
						return obj.kd_admin
					})

            	let jumlah = parseInt(data.quantity)
            	let subtotal  = harga[0] * jumlah
            
                if(stok >= jumlah) {
					
                	con.query("SELECT tgl_penjualan FROM penjualan WHERE tgl_penjualan = ?",[data.tgl_penjualan], (e, result) => {
						if(e) throw e
						
						if(result.length == 0){
							let random = Math.floor(Math.random() * 100)
							let kd_penjualan = new Date(data.tgl_penjualan).getTime().toString().slice(0, 5) + random
							kd_penjualan.toString()
								
							con.query("INSERT INTO penjualan SET kd_penjualan = ?, tgl_penjualan = ?, kd_admin = ?, dibayar = ?", [kd_penjualan, data.tgl_penjualan, kd_admin, data.dibayar], e => {
								if(e) throw e

								con.query("SELECT kd_penjualan FROM penjualan WHERE kd_penjualan = ?",[kd_penjualan], (e, result) => {
									if(e) throw e
									let kd_penjualan = result.map(obj => {
										return obj.kd_penjualan
									})

									con.query("INSERT INTO d_penjualan SET kd_penjualan = ?, kd_barang = ?, jumlah = ?, subtotal = ?", [kd_penjualan, data.kd_barang, jumlah, subtotal], e => {
										if(e) throw e

										con.query("SELECT subtotal FROM d_penjualan WHERE kd_penjualan = ?", [kd_penjualan], (e, rows) => {
											if(e) throw e
											let subtotal = rows.map(function(obj) {
												return parseInt(obj.subtotal)
											})
											let total_penjualan = subtotal.reduce(function(a,b){
												return a + b 
											}, 0)

											con.query("UPDATE penjualan SET total_penjualan = ? WHERE kd_penjualan = ?", [total_penjualan, kd_penjualan], e => {
												if(e) throw e

												con.query('UPDATE barang SET stok = ?? - ? WHERE kd_barang = ?', ["stok",jumlah,data.kd_barang], e => {
													if(e) throw e
													
													con.commit(e => {
														if(e) con.rollback()
														return res.send("SUCCESS")
													})
												})
											})
										})
									})
								})
							})
						} else {
							con.query("SELECT kd_penjualan FROM penjualan WHERE tgl_penjualan = ?", [data.tgl_penjualan.toString()], (e, result) => {
								if(e) throw e
								let kd_penjualan = result.map(function(obj){
									return obj.kd_penjualan
								})
								con.query("INSERT INTO d_penjualan SET kd_penjualan = ?, kd_barang = ?, jumlah = ?, subtotal = ?", [kd_penjualan, data.kd_barang, jumlah, subtotal], e => {

									con.query("SELECT subtotal FROM d_penjualan WHERE kd_penjualan = ?", [kd_penjualan], (e, rows) => {
									if(e) throw e
										let subtotal = rows.map(function(obj) {
											return parseInt(obj.subtotal)
										})	
										let total_penjualan = subtotal.reduce(function(a,b){
											return a + b 
										}, 0)

										con.query("UPDATE penjualan SET total_penjualan = ?  WHERE tgl_penjualan = ?", [total_penjualan, data.tgl_penjualan.toString()], e => {

							 				con.query('UPDATE barang SET stok = ?? - ? WHERE kd_barang = ?', ["stok",jumlah,data.kd_barang], e => {
	                        					if(e) throw e

												con.commit(e => {
													if(e) con.rollback()
													return res.send("SUCCESS")
												})
	                     					})
							 			})
							 		})
						 		})
						 	})
						}
                    })

                } else {
                    con.rollback()
                    return res.send("Stok atau kd_barang tidak ada!");
                }
            })
            })
            })
            })
        })
    }
}