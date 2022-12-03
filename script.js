function getComputerChoice() {
  const options = ['rock', 'paper', 'scissors'];
  const option = Math.trunc(Math.random() * options.length);
  return options[option];
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    shake(playerSelection);
  } else if (playerWinCondition(playerSelection, computerSelection)) {
    points = updateWinnerPoints('player');
    down(playerSelection, computerSelection);
  } else {
    points = updateWinnerPoints('computer');
    up(playerSelection, computerSelection);
  }
}

function playerWinCondition(p, c) {
  return (
    (p === 'rock' && c === 'scissors') ||
    (p === 'scissors' && c === 'paper') ||
    (p === 'paper' && c === 'rock')
  );
}

// Use when it's a tie
function shake(id) {
  const option = document.querySelector(`#${id}`);
  option.animate(
    [{ transform: 'rotate(3deg)' }, { transform: 'rotate(-3deg)' }],
    { duration: 100, iterations: 5 }
  );
}

// Use when computer wins
function up(playerId, computerId) {
  const pseudo = updatePseudoImg(playerId, computerId, computerId);
  pseudo.animate(
    [
      { transform: 'translateY(0)' },
      { transform: 'translateY(-110%)' },
      { transform: 'translateY(0)' },
      { opacity: '0.9' },
    ],
    { duration: animeDuration, iterations: 1 }
  );
}

// Use when computer loses
function down(playerId, computerId) {
  const pseudo = updatePseudoImg(playerId, computerId, playerId);
  pseudo.animate(
    [
      { transform: 'translateY(0)' },
      { transform: 'translateY(110%)' },
      { transform: 'translateY(0)' },
      { opacity: '0.9' },
    ],
    { duration: animeDuration, iterations: 1 }
  );
}

// Update pseudo image url
function updatePseudoImg(playerId, computerId, winnerId) {
  const pseudo = document.querySelector(`#${playerId}Wrapper .pseudo`);
  const computer = document.querySelector(`#${computerId}`);
  if (winnerId === playerId) {
    pseudo.src = computer.src.replace('yellow', 'green');
  } else {
    pseudo.src = computer.src.replace('yellow', 'red');
  }
  return pseudo;
}

// Update points after each round
function updateWinnerPoints(winnerId) {
  const winner = document.querySelector(`#${winnerId}`);
  winner.textContent = Number(winner.textContent) + 1;
  hint(winner);
  return winner.textContent;
}

// Highlists winner points after round
function hint(winner) {
  winner.animate(
    [
      { transform: 'scale(1.1)' },
      { transform: 'scale(1.5)' },
      { transform: 'scale(1)' },
    ],
    {
      duration: animeDuration,
      iterations: 1,
    }
  );
}

const animeDuration = 2000;
const limit = 5;

const options = document.querySelectorAll('.option');
options.forEach(option => {
  option.addEventListener('click', () => {
    playRound(option.id, getComputerChoice());
  });
});

const help = document.querySelector('#help');
help.addEventListener('click', () => {
  const helpers = document.querySelectorAll('.helper');
  helpers.forEach(helper => {
    helper.classList.toggle('active');
  });
  help.classList.toggle('helped');
});
