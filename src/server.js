const express = require('express')
const { ipcRenderer } = require('electron')

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const startService = (localDataChannel, event) => {
  app.use(express.static('public'))

  io.on('connection', socket => {
    console.log('a user connected')
    socket.emit('dataToConnect', localDataChannel)
    socket.on('connectPeer', (data) => {
      event.sender.send('connectPeer', data)
    })
  })

  http.listen(3000, function(){
    console.log('listening on *:3000')
  })
}

module.exports = startService