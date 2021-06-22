

module.exports = {
    get: (con,callback) => {
		con.query("SELECT * FROM pembelian", callback)
	},

	getAll : (con, data, limit, offset, callback) => {
		data.sort == '' || data.sort == null ? sort = 'asc' : sort = data.sort
		data.orderBy == '' || data.orderBy == null ? orderBy = 'kd_pembelian' : orderBy = data.orderBy
		data.search == null ? search = '' : search = data.search

        con.query(`SELECT * FROM pembelian WHERE kd_pembelian LIKE '%${search}%' OR tgl_pembelian LIKE '%${search}%' OR kd_admin LIKE '%${search}%' OR kd_supplier LIKE '%${search}%' OR total_pembelian LIKE '%${search}%' ORDER BY ${orderBy} ${sort}`, callback)
    },

	getById: (con, kd_pembelian, callback) => {
		con.query(`SELECT * FROM pembelian WHERE kd_pembelian = ${kd_pembelian}`, callback)
	},

    getDetail: (con,callback) => {
		con.query("SELECT * FROM d_pembelian", callback)
	},

	getAllDetail : (con, data, limit, offset, callback) => {
		data.sort == '' || data.sort == null ? sort = 'asc' : sort = data.sort
		data.orderBy == '' || data.orderBy == null ? orderBy = 'id_pembelian' : orderBy = data.orderBy
		data.search == null ? search = '' : search = data.search

        con.query(`SELECT * FROM d_pembelian WHERE id_pembelian LIKE '%${search}%' OR kd_pembelian LIKE '%${search}%' OR kd_barang_beli LIKE '%${search}%' OR jumlah LIKE '%${search}%' OR subtotal LIKE '%${search}%' ORDER BY ${orderBy} ${sort}`, callback)
    },

	getDetailById: (con, id_pembelian, callback) => {
		con.query(`SELECT * FROM d_pembelian WHERE kd_pembelian = ${kd_pembelian}`, callback)
	},

    getBarang: (con,callback) => {
		con.query("SELECT * FROM barang_pembelian", callback)
	},

	getAllBarang : (con, data, limit, offset, callback) => {
		data.sort == '' || data.sort == null ? sort = 'asc' : sort = data.sort
		data.orderBy == '' || data.orderBy == null ? orderBy = 'kd_barang_beli' : orderBy = data.orderBy
		data.search == null ? search = '' : search = data.search

        con.query(`SELECT * FROM barang_pembelian WHERE kd_barang_beli LIKE '%${search}%' OR kd_pembelian LIKE '%${search}%' OR nama_barang_beli LIKE '%${search}%' OR satuan LIKE '%${search}%' OR harga_beli LIKE '%${search}%' OR item LIKE '%${search}%' OR total LIKE '%${search}%' OR status LIKE '%${search}%' ORDER BY ${orderBy} ${sort}`, callback)
    },

	getBarangById: (con, kd_barang_beli, callback) => {
		con.query(`SELECT * FROM barang_pembelian WHERE kd_barang_beli = ${kd_barang_beli}`, callback)
	},

	getDataLaporan : (con, res, data, awal, akhir, limit, offset, callback) => {
		data.sort == '' || data.sort == null ? sort = 'asc' : sort = data.sort
		data.orderBy == '' || data.orderBy == null ? orderBy = 'tgl_penjualan' : orderBy = data.orderBy
		data.search == null ? search = '' : search = data.search

        con.query(`SELECT * FROM pembelian WHERE tgl_pembelian BETWEEN '${awal}' AND '${akhir}'`, (err, rows) => {
			if(err) throw err
			let total_pembelian = rows.map((obj) => {
				return obj.total_pembelian
			})

			let total = total_pembelian.reduce((a,b) => {
				return a + b
			}, 0)
			
			res.send({result: rows.length, data: rows, total: total})
		})

    },

	transaction: (con, data, res) => {
		con.beginTransaction(e => {
			if(e) throw e

			let total = parseInt(data.harga_beli) * parseInt(data.jumlah)

			con.query('SELECT kd_admin FROM akses_token', (e, result) => {
				if(e) throw e
				let kd_admin = result.map((obj) => {
					return obj.kd_admin
				})

				kd_admin = kd_admin[kd_admin.length - 1]

				con.query('SELECT kd_admin FROM admin WHERE kd_admin = ?', [kd_admin], (e, result) => {
					if(e) throw e
					let kd_admin = result.map((obj) => {
						return obj.kd_admin
					})

					con.query("SELECT tgl_pembelian, kd_admin, kd_supplier FROM pembelian WHERE tgl_pembelian = ? AND kd_admin =? AND kd_supplier = ?",[data.tgl_pembelian, kd_admin, data.kd_supplier], (e, result) => {
						if(e) throw e
						
						if(result.length == 0){
							let random = Math.floor(Math.random() * 100)
							let kd_pembelian = new Date(data.tgl_pembelian).getTime().toString().slice(0, 5) + random
							kd_pembelian.toString()

							con.query('INSERT INTO barang_pembelian (kd_pembelian, nama_barang_beli, satuan, harga_beli, item, total, status) VALUES (?,?,?,?,?,?,?)', [kd_pembelian, data.nama_barang, data.satuan, data.harga_beli, data.jumlah, total, data.status], (e, rows) => {
								if(e) throw e

								con.query('SELECT kd_supplier FROM supplier WHERE kd_supplier = ?',[data.kd_supplier], (e, result) => {
									if(e) throw e
									let kd_supplier = result.map(obj => {
										return obj.kd_supplier	
									})

									if(data.kd_supplier == kd_supplier) {
										con.query(`SELECT total FROM barang_pembelian WHERE kd_pembelian = ?`, [kd_pembelian], (e, rows) => {
											if(e) throw e
											let total = rows.map(function (obj) {
												return parseInt(obj.total)
											})
											
											let total_pembelian = total.reduce(function(a,b){ return a + b }, 0)

											con.query('INSERT INTO pembelian SET kd_pembelian = ?, tgl_pembelian = ?, kd_admin = ?, kd_supplier = ?, total_pembelian = ?',[kd_pembelian, data.tgl_pembelian, kd_admin, kd_supplier, total_pembelian], e => {
												if(e) throw e

												con.query('SELECT kd_pembelian FROM pembelian WHERE kd_pembelian = ?',[kd_pembelian], (e, result) => {
													if(e) throw e
													let kd_pembelian = result.map(obj => {
														return obj.kd_pembelian
													}) 

													con.query('SELECT kd_barang_beli FROM barang_pembelian', (e, result) => {
														if(e) throw e
														let kd_barang_beli = result.map(obj => {
															return obj.kd_barang_beli
														})

														let kd_barang = kd_barang_beli[kd_barang_beli.length - 1]

														con.query('INSERT INTO d_pembelian (kd_pembelian, kd_barang_beli, jumlah, subtotal) VALUES (?,?,?,?)', [kd_pembelian, kd_barang, data.jumlah, total], e => {
															if(e) throw e

															con.commit(e => {
																if(e) con.rollback()
																return res.json({error: false, message: "SUCCESS", code: 200})
															})
														})
													})
												})
											})
										})

									} else {
										con.rollback()
										return res.json({error: true, message: "kd_supplier is not found", code: 404});
									}

								})
							})

						} else {
							con.query('SELECT kd_pembelian FROM pembelian WHERE tgl_pembelian = ? AND kd_admin = ? AND kd_supplier = ?',[data.tgl_pembelian.toString(), kd_admin, data.kd_supplier], (e, result) => {
								if(e) throw e
								let kd_pembelian = result.map(obj => {
									return obj.kd_pembelian
								})

								con.query('INSERT INTO barang_pembelian (kd_pembelian, nama_barang_beli, satuan, harga_beli, item, total, status) VALUES (?,?,?,?,?,?,?)', [kd_pembelian, data.nama_barang, data.satuan, data.harga_beli, data.jumlah, total, data.status], (e, rows) => {
									if(e) throw e

									con.query('SELECT kd_supplier FROM supplier WHERE kd_supplier = ?',[data.kd_supplier], (e, result) => {
										if(e) throw e
										let kd_supplier = result.map(obj => {
											return obj.kd_supplier	
										})

										if(data.kd_supplier == kd_supplier) {
											con.query(`SELECT total FROM barang_pembelian WHERE kd_pembelian = ?`, [kd_pembelian], (e, rows) => {
												if(e) throw e
												let total = rows.map(function (obj) {
													return parseInt(obj.total)
												})
												let total_pembelian = total.reduce(function(a,b){ return a + b }, 0)

												con.query('UPDATE pembelian SET total_pembelian = ? WHERE tgl_pembelian = ? AND kd_admin = ? AND kd_supplier = ?',[total_pembelian,data.tgl_pembelian.toString(), kd_admin, data.kd_supplier], e => {
													if(e) throw e

													con.query('SELECT kd_barang_beli FROM barang_pembelian', (e, result) => {
														if(e) throw e
														let kd_barang_beli = result.map(obj => {
															return obj.kd_barang_beli
														})

														let kd_barang = kd_barang_beli[kd_barang_beli.length - 1]
														let subtotal = parseInt(data.harga_beli) * parseInt(data.jumlah)

														con.query('INSERT INTO d_pembelian (kd_pembelian, kd_barang_beli, jumlah, subtotal) VALUES (?,?,?,?)', [kd_pembelian, kd_barang, data.jumlah, subtotal], e => {
															if(e) throw e

															con.commit(e => {
																if(e) con.rollback()
																return res.json({error: false, message: "SUCCESS", code: 200})
															})
														})
													})
												})
											})

										} else {
											con.rollback()
											return res.json({error: true, message: "kd_supplier is not found", code: 404});
										}

									})
								})
							})

						}

					})
				})
			})

		})
	}
}