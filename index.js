const path = require('path')
const { createServer } = require('http')
const { Server } = require('socket.io')
const express = require('express')

const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer)
const port = process.env.PORT || 3000

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

io.on('connection', function (socket) {
  console.log('got connection')

  socket.on('chat message', function (msg) {
    console.log(`got message: ${msg}`)
    if (typeof msg === 'string' || msg instanceof String) {
      msg = msg.toUpperCase()
    }
    io.emit('chat message', msg)
  })
})
