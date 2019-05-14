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



app.listen(port, function(){
  console.log('Running on port 8080');
});
