const express = require("express")
const path = require('path')
const bodyParser = require('body-parser')
const post = require('./routes/index')
app.use(express.static(path.join(__dirname, 'public')))
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)

const port = process.env.PORT || 5050

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})