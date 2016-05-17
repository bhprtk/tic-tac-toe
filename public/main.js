'use strict';

var socket;
var player;

$(() => {
  socket = io();

  socket.on('playerNum', playerNum => {
    player = playerNum;
    $('#playerNum').text(`You are Player ${playerNum}`);
    $('#status').text(`Waiting for opponent.`);
  });

  socket.on('gameStart', () => {
    $('#status').text(`Game start.`);

  });






});
