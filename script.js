const gameboard = (function () {
  let gameboardContent;

  const winningRows = [
    [0, 1, 2], //horizontal
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], //vertical
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], //diagonal
    [6, 4, 2],
  ];

  const initBoard = () => {
    gameboardContent = [];
    for (let i = 0; i < 9; i++) {
      gameboardContent.push("");
    }
  };

  const setMarker = (marker, positionIndex) => {
    gameboardContent[positionIndex] = marker;
  };

  const checkWin = (playerSymbol, lastFilledPositionIndex) => {
    for (row of winningRows) {
      if (row.includes(parseFloat(lastFilledPositionIndex))) {
        let count = 0;
        for (position of row) {
          if (gameboardContent[position] !== playerSymbol) {
            break;
          } else {
            count++;
          }
        }
        if (count == 3) {
          return true;
        }
      }
    }
    // console.log(`last filled Position Index ${lastFilledPositionIndex}`);
    return false;
    // return `${playerSymbol}, ${lastFilledPositionIndex}`;
  };

  const displayBoard = () => console.log(gameboardContent);
  const contentOfField = (positionIndex) => gameboardContent[positionIndex];

  return { setMarker, initBoard, checkWin, displayBoard, contentOfField };
})();

function player(name, symbol) {
  const setName = (newName) => {
    name = newName;
  };

  const getName = () => name;

  return { getName, symbol, setName };
}

function game() {
  const playerOne = player("Player 1", "X");
  const playerTwo = player("Player 2", "O");
  let numberOfFilledFields = 0;
  let currentPlayer;
  let winnerFound;
  let winnerPlayer;

  const getCurrentPlayer = () => currentPlayer;

  const compareObjects = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  };

  const switchPlayer = () => {
    if (compareObjects(currentPlayer, playerOne)) {
      currentPlayer = playerTwo;
    } else {
      currentPlayer = playerOne;
    }
    console.log(currentPlayer);
  };

  const startGame = () => {
    gameboard.initBoard();
    console.log("Welcome to Tic Tac Toe!");

    let playerOneName = prompt(
      "How does Player 1 want to be called?",
      "Hello Kitty"
    );
    playerOne.setName(playerOneName);

    let playerTwoName = prompt(
      "How does Player 2 want to be called?",
      "Wolfgang"
    );
    playerTwo.setName(playerTwoName);

    currentPlayer = playerOne;

    console.log("Nice! Let's begin!");
    gameboard.displayBoard();
  };

  const playTurn = (currentPlayer) => {
    const currentPlayerName = currentPlayer.getName();
    let positionIndex = prompt(
      `It's ${currentPlayerName}'s turn! (Submit a number from 0 to 8 corresponding to the position on the tic-tac-toe gameboard)`,
      8
    );
    while (gameboard.contentOfField(positionIndex) != "") {
      positionIndex = prompt(
        `Sorry, that field is already filled. Try another one! (number from 0 to 8)`,
        8
      );
    }
    gameboard.setMarker(currentPlayer.symbol, positionIndex);
    numberOfFilledFields++;
    if (numberOfFilledFields > -1) {
      winnerFound = gameboard.checkWin(currentPlayer.symbol, positionIndex);
      if (winnerFound) {
        winnerPlayer = currentPlayer;
        console.log(`winner: ${winnerPlayer.getName()}`);
      }
      console.log(`winner Found? : ${winnerFound}`);
    }

    switchPlayer();
    gameboard.displayBoard();
  };

  const getWinnerFound = () => winnerFound;
  const getWinner = () => winnerPlayer;

  return { startGame, playTurn, getCurrentPlayer, getWinnerFound, getWinner };
}

const playGame = () => {
  const gameOne = game();
  gameOne.startGame();

  for (let i = 0; i < 9; i++) {
    gameOne.playTurn(gameOne.getCurrentPlayer());
    if (i > 3) {
      if (gameOne.getWinnerFound()) {
        console.log(`Congrats! ${gameOne.getWinner().getName()} has won!`);
        break;
      }
    }
  }
  if (!gameOne.getWinnerFound()) {
    console.log(`It's a tie.`);
  }
  continuePlaying = prompt(
    `Down for another game? Press "Enter" for yes, submit anything else than "Y" or Press "Cancel" for no`,
    "Y"
  );
};

let continuePlaying;
do {
  playGame();
} while (continuePlaying === "Y");

console.log(`Thanks for playing!`);
