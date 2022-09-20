'use strict';
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');


score0El.textContent = 0;
score1El.textContent = 0;



let currentDice = document.querySelector('.dice');

const scores = [0,0];
let currentScore = 0;
let activePlayer = 0;

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
currentDice.classList.add('hidden');

var diceRoll = new Audio('dice-roll.mp3');
var oops = new Audio('oops.mp3');

const roll = ()=>{
  currentDice.classList.remove('hidden');
    let dice = Math.floor(Math.random()*6)+1;
    let diceImg = `dice-${dice}.png`;
    console.log(dice);
    currentDice.src = diceImg;
    currentScore+=dice;
    document.getElementById(`current--${activePlayer}`).textContent=currentScore;
    if(dice==1){
      document.getElementById(`current--${activePlayer}`).textContent=0;
      activePlayer = activePlayer ===0 ? 1 : 0;
      oops.play();
      currentScore=0;
        player1.classList.toggle('player--active');
        player2.classList.toggle('player--active');
    }else{
      diceRoll.play();
    }
  }


let holdScore = 0;
let prevs =0;
var holds = new Audio('hold.mp3');
const switchplayer = ()=>{
    holds.play();
    let sc = document.getElementById(`current--${activePlayer}`).textContent;
    holdScore += Number(sc);
    prevs = Number(document.getElementById(`score--${activePlayer}`).textContent);
    holdScore+=prevs;
    console.log(sc);
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    document.getElementById(`score--${activePlayer}`).textContent = holdScore;
    holdScore=0;
    activePlayer = activePlayer ===0 ? 1 : 0;
    currentScore=0;
    player1.classList.toggle('player--active');

    player2.classList.toggle('player--active');

    chk();

}


var audio = new Audio('win.mp3');

const chk = function(){
  console.log('calling');
  const player1score = Number(document.getElementById(`score--0`).textContent);
  const player2score = Number(document.getElementById(`score--1`).textContent);
  const fireworksp1 = document.querySelector('.fireworks-player0');
  const fireworksp2 = document.querySelector('.fireworks-player1');
  const headmsg = document.querySelector('#topheading');
  console.log(player1score);
  if(player1score>=100)
  {
    audio.play();
    player1.classList.toggle('player--active');

    player2.classList.toggle('player--active');
    headmsg.textContent="Player 1 wins";
    fireworksp1.classList.remove('hidden');
  }
  if(player2score>=100)
  {
    audio.play();
    player1.classList.toggle('player--active');

    player2.classList.toggle('player--active');
    fireworksp2.classList.remove('hidden');
    headmsg.textContent="Player 2 wins";

  }
}


const reset = () => {


  const fireworksp1 = document.querySelector('.fireworks-player0');
  const fireworksp2 = document.querySelector('.fireworks-player1');
  console.log('reset');

  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentDice.classList.add('hidden');
  currentScore=0;
  if(player2.classList.contains('player--active')){
    activePlayer = 0;
      player1.classList.toggle('player--active');
      player2.classList.toggle('player--active')

  }

  if(!fireworksp1.classList.contains('hidden'))
    fireworksp1.classList.add('hidden');

  if(!player2.classList.contains('player--active'))
    fireworksp2.classList.add('hidden');






}

function closeModal(){
  document.querySelector('.modal').classList.add('hidden');
}

function help(){
  document.querySelector('.modal').classList.toggle('hidden');
}

document.querySelector('.btn--new').addEventListener('click', reset);

document.querySelector('.btn--roll').addEventListener('click', roll);

document.querySelector('.btn--hold').addEventListener('click',switchplayer);
