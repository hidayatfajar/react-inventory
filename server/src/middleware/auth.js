const con = require ('../config/db')
const jwt = require ('jsonwebtoken')
require('dotenv').config()

module.exports = {

    // register admin
    register: (req, res) => {
        con.beginTransaction( err => {
            if (err) res.send(err.sqlMessage, 400)

            const post = {
                nama: req.body.nama,
                email: req.body.email,
                password: req.body.password,
            }

            con.query('SELECT email FROM admin WHERE email = ?', [post.email], (err, rows) => {
                if (err) res.send(err.sqlMessage, 400)

                if (rows.length == 0){
                    con.query('INSERT INTO admin SET ?', [post], err => {
                        if (err) res.send(err.sqlMessage, 400)

                        res.json({error : false, message :"Berhasil menambahkan admin baru"})

                        con.commit(err => {
                            if (err) {
                                res.send(err.sqlMessage, 400)
                                con.rollback()
                            }
                        })
                    })
                } else {
                    res.json({error : true , message:"Email sudah terdaftar"})
                    con.rollback()
                }
            })

        })
    },

    login: (req, res) => {
        const post = {
            password: req.body.password,
            email: req.body.email
        }

        con.query(`SELECT * FROM admin WHERE password = ? AND email = ?`,[post.password, post.email], (err, rows) => {
            if (err) res.send(err.sqlMessage, 400)

            if(rows.length == 1){
                let token = jwt.sign({rows}, process.env.SECRET, {expiresIn: 1000})

                const kd_admin = rows[0].kd_admin
                let nama = rows.map(obj => {
                    return obj.nama
                })
                let email = rows.map(obj => {
                    return obj.email
                })
                let gambar = rows.map(obj => {
                    return obj.gambar
                })

                let password = rows.map(obj => {
                    return obj.password
                })
                const data = {
                    kd_admin: kd_admin,
                    akses_token: token
                }
    
                con.query('INSERT INTO akses_token SET ?', [data], (e, rows) => {
                    if(err) return res.send(err.sqlMessage, 400)
                    res.json ({
                        status: true,
                        message: 'Berhasil menggenerate token',
                        token: token,
                        kd_admin: kd_admin,
                        nama : nama,
                        email : email,
                        gambar : gambar,
                        password : password
                    })
                })
            } else {
                return res.json({error: true, message: 'email atau password salah'})
            }

        })
    },

    inventori: (req, res) => {
        res.send("ini adalah halaman inventori")
    }

}