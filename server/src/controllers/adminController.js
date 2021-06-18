const admin = require ('../models/Admin')

module.exports = {
    getAll : (req, res) => {
        let page = req.query.page || 1
        let limit = req.query.limit || 3
        let offset = ( page - 1 ) * limit
        
        admin.getAll(req.con, req.query, limit, offset, (err, rows) => {
            if(err) throw (err)
            admin.get(req.con, (err, results) => {
                if(err) throw (err)
                const pageLimit = Math.ceil(results.length/parseInt(limit))
                res.json({page: `${page} of ${pageLimit}`, result:rows.length, data: rows})
            })
        })
    },

    getById : (req, res) => {
        admin.getById(req.con, req.params.id, (err, rows) => {
            if(err) throw (err)
            rows.length == 0 ? res.send("id admin tidak di temukan") : res.json({data : rows})
        })
    },

    update : (req, res) => {
        admin.update(req.con, req.body, req.params.id, res, err => {
            if(err) throw (err)
            res.send("Success update data.", 200)
        })
    },

    delete : (req, res) => {
        admin.delete(req.con, req.params.id, res, err => {
            if (err) return res.send(err.sqlMessage, 400)
            res.send("Success delete data.", 200)
        })
    }

}