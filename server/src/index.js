// Import NPM
const express = require('express')
const cors = require('cors')
const multer = require('multer')
  
// Import file
const con = require('./config/db')

const app = express()
const port = 8000

// setup multer
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if( file.mimetype === 'image/png' || 
      file.mimetype === 'image/jpg' || 
      file.mimetype === 'image/jpeg' 
    ){
      cb(null, true)
    } else {
      cb(null, false)
    }
}

app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('gambar'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())

// connecting route to database
app.use(function(req, res, next) {
    req.con = con
    next()
  })

// include router
const dataRouter = require('./routes/dataRouter')
const supplierRouter = require('./routes/supplierRouter')
const authRouter = require('./routes/authRouter')
const perusahaanRouter = require('./routes/perusahaanRouter')

const adminRouter = require('./routes/adminRouter')
const penjualanRouter = require('./routes/penjualanRouter')
const pembelianRouter = require('./routes/pembelianRouter')

// use router
app.use(dataRouter)
app.use(supplierRouter)
app.use(authRouter)
app.use(perusahaanRouter)

app.use(adminRouter)
app.use(penjualanRouter)
app.use(pembelianRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}!`)
})