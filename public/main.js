'use strict';

var socket;
var player;
var playerTurn;

$(() => {
  socket = io();

  socket.on('playerType', playerType => {
    player = playerType;
    $('#playerType').text(`You are Player ${playerType}`);
    $('#status').text(`Waiting for opponent.`);
  });

  socket.on('gameStart', () => {
    $('#status').text(`Game start.`);
    playerTurn = 'X';
  });

  $(".block").click(clickBlock);




});

function clickBlock() {
  var blockId = $(this).attr('id');
  $('#' + blockId).text(player);
}
