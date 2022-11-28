function getComputerChoice() {
  const options = ['Rock', 'Paper', 'Scissors'];
  const option = Math.trunc(Math.random() * 3);
  return options[option];
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return "That's a tie";
  } else if (
    (playerSelection === 'Rock' && computerSelection === 'Scissors') ||
    (playerSelection === 'Scissors' && computerSelection === 'Paper') ||
    (playerSelection === 'Paper' && computerSelection === 'Rock')
  ) {
    return `You've Won! ${playerSelection} beats ${computerSelection}`;
  } else {
    return `You've Lose! ${computerSelection} beats ${playerSelection}`;
  }
}

function showResult(resultMsg) {
  const resultContainer = document.querySelector('#result');
  resultContainer.textContent = resultMsg;
}

function sumPoint(resultMsg) {
  if (resultMsg.includes('Won')) {
    let point = Number(document.querySelector('#player').textContent);
    point += 1;
    document.querySelector('#player').textContent = point;
  } else if (resultMsg.includes('Lose')) {
    let point = Number(document.querySelector('#computer').textContent);
    point += 1;
    document.querySelector('#computer').textContent = point;
  }
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const resultMsg = playRound(button.textContent, getComputerChoice());
    showResult(resultMsg);
    sumPoint(resultMsg);
  });
});
