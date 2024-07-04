const http = require('http')
const express = require('express')
const app = express()

require('./utils/routes')(app)
const server = http.createServer(app)

module.exports = server
