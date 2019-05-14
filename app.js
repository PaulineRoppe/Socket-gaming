////////////1ere version du Web Server///////

// const express = require('express');
// const fs = require('fs');
// const hostname = '127.0.0.1';
// const port = 8080;
// const app = express();
//
// let cache = [] //Array is OK
// cache[0] = fs.readFileSync(__dirname + '../public/MasterMind.html');
//
// app.get('/', (req, res) => {
//   res.setHeader('Content-Type', 'text/html');
//   res.send(cache[0]);
// });
//
// app.listen(port, () => {
//   console.log('Server is running at http:${hostname}:${port}');
// });

///////////2eme version du Web serveur//////

var express = require('express');
var app = express();
var path = require('path');
var port = 8080;

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/MasterMind.html'));
});

app.listen(port, function(){
  console.log('Running on port 8080');
});
app.use(express.static('public'));

///////////////3ème version du Web Serveur//////////////
// var http = require('http');
// var fs = require('fs');
// var port = 8080;
//
// http.createServer((req, res) => {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   var readStream = fs.createReadStream('./MasterMind.html', 'utf8');
//   readStream.pipe(res);
// }).listen(port, () => {
//   console.log("Server running on port " + port);
// });
