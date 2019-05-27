///////////2eme version du Web serveur//////

const express = require('express');
const app = express();
const path = require('path');
const io = require('socket.io');
var port = 8080;

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/MasterMind.html'));
});
//Mise en place des Socket et Room pour le jeux à 2
// io.on('connection', function(socket){
//   console.log('user connected');
//   socket.on('disconnect', function(){
//       console.log('user disconnected');
//   });
//   socket.on('chat message', function(msg){
//     io.emit('chat message', msg);
//   })
// });

app.listen(port, function(){
  console.log('Running on port 8080');
});
