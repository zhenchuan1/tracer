const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const app = express()
const Service = new (require("./service/baseService"))()

app.use(compression())

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

// PUT
app.post('/put', async function(req, res) {
  res.json({
    code: 0,
  })
  Service.put(req.body)
})

// GET
app.get('/get', async function(req, res) {
  const data = await Service.get(req.query)
  res.json(data)
})

app.listen(22030, function () {
  console.log('Tracer app listening on port 22030!')
})
