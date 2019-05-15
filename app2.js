var express = require('express');
const app = express();
const path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 8080;

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/MasterMind.html'));
});

/// Connexion WebSocket ///
var playground = io.of('/roomGame');
io.on('connection', function(socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function(data) {
    console.log(data);
  })
});

server.listen(port, (req, res) => {
  console.log('server listening on port ' + port);
});
