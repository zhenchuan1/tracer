const express = require('express')
var process = require('process')
const bodyParser = require('body-parser')
const compression = require('compression')
var app = express()
app.use(compression())

const port = (function () {
  if (typeof (process.argv[2]) !== 'undefined') { // 如果输入了端口号，则提取出来
    if (isNaN(process.argv[2])) { // 如果端口号不为数字，提示格式错误
      throw 'Please write a correct port number.'
    } else { // 如果端口号输入正确，将其应用到端口
      return process.argv[2]
    }
  } else { // 如果未输入端口号，则使用下面定义的默认端口
    return 22020
  }
})()


app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

// PUT
app.post('/put', async function(req, res) {
  res.json({
    code: 0,
  })
})

// GET
app.get('/get', function(req, res) {
  res.json({
    code: 0
  })
})

app.listen(port, function () {
  console.log('Tracer app listening on port ' + port + ' !')
})
