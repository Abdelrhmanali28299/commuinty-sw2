const express = require("express")
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const post = require('./routes/post')
const user = require('./routes/user')
const keys = require('./config')

const app = express()
mongoose.Promise = global.Promise

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log(`your database connected`)
  })
  .catch(err => {
    console.log(err)
  })

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/post', post)
app.use('/user', user)

const port = process.env.PORT || 5050

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
