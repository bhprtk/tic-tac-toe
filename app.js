'use strict';

const PORT = process.env.PORT || 3000;

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
var gameStates = {};
io.on('connection', function(socket) {

    userCount++;
    console.log('userCount', userCount);
    io.emit('userCount', userCount);

    if (userCount === 1) {
        socket.emit('playerType', 'X');
    } else if (userCount === 2) {
        socket.emit('playerType', 'O');
        io.emit('gameStart', null);
    }else if(userCount>2){
        socket.emit('playerType', 'Visitor');
    }

    socket.on('gameState', function(gameState) {
        console.log(gameState);
        var position = gameState.position;
        console.log('position: ', position);
        if (!gameStates[`${position}`]) {
          gameStates[`${position}`] = gameState.player;
          gameStates['lastUser'] = gameState.player;

          io.emit('gameStates', gameStates);
        } else {
          console.log('the state already exists');
        }
    });


    socket.on('finalWinner', function(winner) {
        console.log('winner:', winner);
    });




    socket.on('disconnect', function() {
        userCount--;
        gameStates = {};
        console.log('userCount:', userCount);
    });
});









server.listen(PORT, err => {
    console.log(err || `Server listening on port ${PORT}`);
});
