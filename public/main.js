'use strict';

var socket;
var player;
var playerTurn;
var lastUser = 'X';
var winner;

$(() => {
    $('.block-container').hide();
    $('.joinGame').click(gameStart);

});

function gameStart(){
    $('.block-container').fadeIn();
    console.log('connect to socket');

    socket = io();

    socket.on('playerType', playerType => {
        player = playerType;
        $('#status').text(`You are Player ${playerType}`);
        if(playerType==='X' || playerType ==='O'){
            $(this).hide();
        }
    });

    socket.on('gameStart', () => {
        playerTurn = 'X';
    });


    socket.on('gameStates', (gameStates) => {
    //   console.log('gameStates: ', gameStates);
    //   console.log(gameStates.lastUser);
      lastUser = gameStates.lastUser;
    //   console.log('lastUser: ', lastUser);
    //   console.log('player', player);
      if(player!==lastUser){
        //   $('#status span').text(`Your turn`);
          console.log('can move');
          $(".block").on('click', clickBlock);
      }else{
        //   $('#status span').text(`Waiting for other player...`);
          console.log('cannot move');
          $(".block").off('click');
      }
      for(var element in gameStates){
        $(`.block[data-pos="${element}"]`).text(`${gameStates[element]}`);
      }
      if(winCheck()){
          winner = winCheck();
          socket.emit('finalWinner', winner);
          if(winner === player){
              if(confirm(`You won! `)){
                  location.reload();
              }
          }else{
              if(confirm(`You lost! Try again.`)){
                  location.reload();
              }
          }

      }
    });

    $(".block").click(clickBlock);
}

function clickBlock(e) {
    // console.log('clicked');
    console.log(e.target);
    $(e.target).addClass('animated tada').off('click');
    var position = $(e.target).attr('data-pos');
    console.log(player, position);
    socket.emit('gameState', {
        position: position,
        player: player
    });
}



function winCheck() {
  var winner;
  if($('#1').text() === 'X' && $('#2').text() === 'X' && $('#3').text() === 'X'){
    winner = 'X';
  } else if($('#4').text() === 'X' && $('#5').text() === 'X' && $('#6').text() === 'X') {
    winner = 'X';
  } else if($('#7').text() === 'X' && $('#8').text() === 'X' && $('#9').text() === 'X') {
    winner = 'X';
  } else if($('#1').text() === 'X' && $('#4').text() === 'X' && $('#7').text() === 'X') {
    winner = 'X';
  } else if($('#2').text() === 'X' && $('#5').text() === 'X' && $('#8').text() === 'X') {
    winner = 'X';
  } else if($('#3').text() === 'X' && $('#6').text() === 'X' && $('#9').text() === 'X') {
    winner = 'X';
  } else if($('#1').text() === 'X' && $('#5').text() === 'X' && $('#9').text() === 'X') {
    winner = 'X';
  } else if($('#3').text() === 'X' && $('#5').text() === 'X' && $('#7').text() === 'X') {
    winner = 'X';
  } else if($('#1').text() === 'X' && $('#2').text() === 'X' && $('#3').text() === 'X'){
    winner = 'X';
  } else if($('#4').text() === 'O' && $('#5').text() === 'O' && $('#6').text() === 'O') {
    winner = 'O';
  } else if($('#7').text() === 'O' && $('#8').text() === 'O' && $('#9').text() === 'O') {
    winner = 'O';
  } else if($('#1').text() === 'O' && $('#4').text() === 'O' && $('#7').text() === 'O') {
    winner = 'O';
  } else if($('#2').text() === 'O' && $('#5').text() === 'O' && $('#8').text() === 'O') {
    winner = 'O';
  } else if($('#3').text() === 'O' && $('#6').text() === 'O' && $('#9').text() === 'O') {
    winner = 'O';
  } else if($('#1').text() === 'O' && $('#5').text() === 'O' && $('#9').text() === 'O') {
    winner = 'O';
  } else if($('#3').text() === 'O' && $('#5').text() === 'O' && $('#7').text() === 'O') {
    winner = 'O';
  } else {
    console.log('no winner yet');
  }


  return winner;
}
