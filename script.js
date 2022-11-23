function getComputerChoice() {
  return Math.trunc(Math.random() * 3);
}

function getPlayerChoice() {
  let option;
  do {
    option = prompt('Rock or Paper or Scissors').toLowerCase();
  } while (!options.includes(option));
  return options.findIndex(value => value.toLowerCase() === option);
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    alert("That's a tie");
    return 'tie';
  } else if (
    (playerSelection === 0 && computerSelection === 2) ||
    (playerSelection === 2 && computerSelection === 1) ||
    (playerSelection === 1 && computerSelection === 0)
  ) {
    alert(
      `You've Won! ${options[playerSelection]} beats ${options[computerSelection]}`
    );
    return 'player';
  } else {
    alert(
      `You've Lose! ${options[computerSelection]} beats ${options[playerSelection]}`
    );
    return 'computer';
  }
}

function game(rounds = 1) {
  if (rounds > 1) game(rounds - 1);
  results.push(playRound(getPlayerChoice(), getComputerChoice()));

  if (rounds === 5) {
    alert(
      `Player: ${
        results.filter(value => value === 'player').length
      }  Computer: ${results.filter(value => value === 'computer').length}`
    );
  }
}

const options = ['rock', 'paper', 'scissors'];
const results = [];

game(5);
