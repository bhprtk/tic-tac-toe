'use strict';

var socket;
var player;
var playerTurn;
var lastUser = 'X';

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


    socket.on('gameStates', (gameStates) => {
      console.log('gameStates: ', gameStates);
      console.log(gameStates.lastUser);
      lastUser = gameStates.lastUser;
      for(var element in gameStates){
        console.log(element, gameStates[element]);
        // $(`.block[data-pos="${element}"]`).text(`${gameStates[element]}`);
        $(`#${element}`).text(gameStates[element]);
        // var blockList = $('.block');
        // console.log('blockList: ' ,blockList);
        // blockList.forEach(block => {
        //   block.text()
        // });
      }
      // console.log('gameStates.length', gameStates.length);

    });

    $(".block").click(clickBlock);
    //
    // if(player !== lastUser) {
    //   $(".block").click(clickBlock);
    // } else {
    //   console.log("it's not your turn");
    // }

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
