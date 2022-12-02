function getComputerChoice() {
  const options = ['rock', 'paper', 'scissors'];
  const option = Math.trunc(Math.random() * options.length);
  return options[option];
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    shake(playerSelection);
    setStatus('tie');
  } else if (playerWinCondition(playerSelection, computerSelection)) {
    setStatus('player');
    updateWinnerPoints('player');
    down(playerSelection, computerSelection);
  } else {
    setStatus('computer');
    updateWinnerPoints('computer');
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

function setStatus(winner) {
  const status = document.querySelector('#status');
  if (winner === 'player') {
    status.className = 'won';
    status.textContent = 'You won!';
  } else if (winner === 'computer') {
    status.className = 'lost';
    status.textContent = 'You lost!';
  } else {
    status.className = 'tie';
    status.textContent = "That's a tie!";
  }
  setTimeout(() => {
    status.className = 'hidden';
  }, animeDuration);
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
  const pseudo = updatePseudoImg(playerId, computerId);
  pseudo.animate(
    [
      { transform: 'translateY(0)' },
      { transform: 'translateY(-110%)' },
      { transform: 'translateY(0)' },
    ],
    { duration: animeDuration, iterations: 1 }
  );
}

// Use when computer loses
function down(playerId, computerId) {
  const pseudo = updatePseudoImg(playerId, computerId);
  pseudo.animate(
    [
      { transform: 'translateY(0)' },
      { transform: 'translateY(110%)' },
      { transform: 'translateY(0)' },
    ],
    { duration: animeDuration, iterations: 1 }
  );
}

// Update pseudo image url
function updatePseudoImg(playerId, computerId) {
  const pseudo = document.querySelector(`#${playerId}Wrapper #pseudo`);
  const computer = document.querySelector(`#${computerId}`);
  pseudo.src = computer.src;
  return pseudo;
}

// Update points after each round
function updateWinnerPoints(winnerId) {
  const winner = document.querySelector(`#${winnerId}`);
  winner.textContent = Number(winner.textContent) + 1;
}

const options = document.querySelectorAll('.option');
const animeDuration = 2000;

options.forEach(option => {
  option.addEventListener('click', () => {
    playRound(option.id, getComputerChoice());
  });
});
