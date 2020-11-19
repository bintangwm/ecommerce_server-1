if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors())
app.get(('/'),(req,res) => {
  res.status(200).json({msg: 'hello'})
})

app.use('/', routes)
app.use(errorHandler)

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

module.exports = app