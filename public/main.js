'use strict';

var socket;
var player;
var playerTurn;
var lastUser = 'X';

$(() => {
    $('.joinGame').click(gameStart);
});

function gameStart(){
    console.log('connect to socket');
    $(this).hide()
    socket = io();

    socket.on('playerType', playerType => {
        player = playerType;
        $('#status').text(`You are Player ${playerType}`);
    });

    socket.on('gameStart', () => {
        // $('#status').text(`Game start.`);
        playerTurn = 'X';
    });


    socket.on('gameStates', (gameStates) => {
      console.log('gameStates: ', gameStates);
      console.log(gameStates.lastUser);
      lastUser = gameStates.lastUser;
      console.log('lastUser: ', lastUser);
      console.log('player', player);
      if(player!==lastUser){
          console.log('can move');
          $(".block").on('click', clickBlock);
      }else{
          console.log('cannot move');
          $(".block").off('click');
      }
      for(var element in gameStates){
        $(`.block[data-pos="${element}"]`).text(`${gameStates[element]}`);
      }
    });

    $(".block").click(clickBlock);
}

function clickBlock(e) {
    console.log('clicked');
    console.log(e.target);
    $(e.target).off('click');
    var position = $(e.target).attr('data-pos');
    console.log(player, position);
    socket.emit('gameState', {
        position: position,
        player: player
    });
}
