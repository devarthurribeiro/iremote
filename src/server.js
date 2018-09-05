const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', function(req, res){
  res.send('hello')
})

io.on('connection', function(socket){
  console.log('a user connected')
  socket.on('sendScreen', function(screen){
    console.log(screen)
  })
})



http.listen(3000, function(){
  console.log('listening on *:3000')
})