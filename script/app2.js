const express = require('express');
const app = express();
const path = require('path');
const Master = require('./MasterMind');
const ComException = require('./ComException');

app.use(express.static(path.join(__dirname, '..', 'public')));

var server = require('http').createServer(app);
var io = require('socket.io')(server);

// const masters = {};

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/MasterMind.html'));
});

// const ex = (fct) => {
//   return (...args) => {
//     try {
//       return fct(...args);
//     }catch(e) {
//       cosole.error("exception", e);
//     }
//   }
// }
// /// Connexion WebSocket ///
// var playground = io.of('/roomGame');
//
// io.on('connection', ex((socket) => {
//   let master = null;
//   console.log('user ${socket.id} connected');
//
//   socket.on('disconnect', ex(() => {
//     if(master) {
//       master.removePlayer(socket.id);
//       io.in('/master/${master.id}').emit("gameState", master.toJson());
//       console.og('user ${socket.id} leaved game ${master.id}');
//       socket.leave('/master/${master.id}');
//       master = null;
//     }
//     console.log('user ${socket;id} disconnected');
//   }));
//
//   socket.on('newGame', ex(() => {
//     const master = new Master();
//     masters[master.id] = master;
//     console.log('user ${socket.id} asks for a new game, generated ${game.id}');
//     io.to('${socket.id}').emit("newGame", master.id);
//   }));
//
//   socket.on("enterGame", ex((gameId) => {
//     if(!masters[gameId]) {
//       const tmp = new Master();
//       tmp.id = gameId;
//       asters[tmp.id] = tmp;
//     }
//     masters[gameId].addPlayer(socket.id);
//     master = masters[gameId];
//     socket.join('/master/${master.id}');
//     console.log('user ${socket.id} joined the game ${master.id}');
//     io.in('/master/${master.id}').emit("gameState", master.toJson());
//   }));
//
//   socket.on("exitGame", ex((msg) => {
//     master.removePlayer(socket.id);
//     io.in('/master/${master/id}').emit("gameState", game.toJson());
//     console.log('user ${socket.id} leaved game ${master.id}');
//     socket.leave('/master/${master.id}');
//     master = null;
//   }));
//
//   socket.on("play", ex((msg) => {
//     const x = msg[0];
//     const y = msg[1];
//     console.log('user ${socket.id} playing ${x}, ${y}');
//     master.play(socket.id, x, y);
//     io.in('/master/${master.id}').emit("gameState", master.toJson());
//     console.log('user ${socket.id} played ${x}, ${y}');
//   }));
//
//   socket.on("reset", ex((msg) => {
//     console.log('user ${socket.id} reset game ${aster.id}');
//     master.reset();
//     io.in('/master/${master.id}').emit("gameState", master.toJson());
//   }));
// }));
//
// const PORT = process.env.PORT || 8080;
//
// server.listen(PORT, () => {
//   console.log('server listening on port *:${PORT}');
// });
