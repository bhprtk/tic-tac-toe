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

    socket.on('gameStates', (gameStates) => {
      console.log('gameStates: ', gameStates);
    })


});

function clickBlock(e) {
    console.log(e.target);
    $(e.target).off('click');
    var position = $(e.target).attr('data-pos');
    console.log(player, position);
    socket.emit('gameState', {
        position: position,
        player: player
    });
}
