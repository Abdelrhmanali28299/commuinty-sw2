const express = require("express")
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const post = require('./routes/index')
const keys = require('./config')

const app = express()
mongoose.Promise = global.Promise

connectDB = async () => {
  mongoose
    .connect(keys.mongoURI, { useMongoClient: true })
    .then(() => {
      console.log(`your database connected`)
    })
    .catch(err => {
      console.log(err)
    })
}
const start = async () => {
  await connectDB()
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use(express.static(path.join(__dirname, 'public')))

  app.use('/', index)

  const port = process.env.PORT || 5050

  app.listen(port, () => {
    console.log(`Server started on port ${port}`)
  })
}

await start()
