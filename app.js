'use strict';

const PORT = 3000;

var express = require('express');
var morgan = require('morgan');
var http = require('http');
var path = require('path');

var app = express();

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
var server = http.createServer(app);

var io = require('socket.io')(server);

var userCount = 0;

io.on('connection', function(socket) {
  userCount++;
  console.log('userCount', userCount);

  if(userCount === 1) {
    socket.emit('playerType', 'X');
  } else if(userCount === 2) {
    socket.emit('playerType', 'O');
    io.emit('gameStart', null);
  }









  socket.on('disconnect', function() {
      userCount--;
      console.log('userCount:', userCount);
    });
});














server.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});
