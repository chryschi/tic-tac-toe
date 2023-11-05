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
  // continuePlaying = prompt(
  //   `Down for another game? Press "Enter" for yes, submit anything else than "Y" or Press "Cancel" for no`,
  //   "Y"
  // );
};

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
    displayController.renderGameboard();
    console.log("Welcome to Tic Tac Toe!");

    // let playerOneName = prompt(
    //   "How does Player 1 want to be called?",
    //   "Hello Kitty"
    // );
    // playerOne.setName(playerOneName);

    // let playerTwoName = prompt(
    //   "How does Player 2 want to be called?",
    //   "Wolfgang"
    // );
    // playerTwo.setName(playerTwoName);

    currentPlayer = playerOne;

    console.log("Nice! Let's begin!");
    gameboard.displayBoard();
  };

  const randomPosition = () => Math.floor(Math.random() * 9);

  const playTurn = (currentPlayer) => {
    const currentPlayerName = currentPlayer.getName();
    let positionIndex = randomPosition();

    while (gameboard.contentOfField(positionIndex) != "") {
      console.log(`Sorry! Position ${positionIndex} is already filled!`);
      positionIndex = randomPosition();
    }
    console.log(`${currentPlayerName} picked position ${positionIndex}!`);
    gameboard.setMarker(currentPlayer.symbol, positionIndex);
    displayController.renderGameboard();
    numberOfFilledFields++;
    if (numberOfFilledFields > 4) {
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

  return {
    startGame,
    playTurn,
    getCurrentPlayer,
    getWinnerFound,
    getWinner,
  };
}

// handle DOM
const displayController = (function () {
  const gameboardContainer = document.querySelector("#gameboard-container");

  const renderGameboard = () => {
    emptyGameboardContainer();
    for (let i = 0; i < 9; i++) {
      const field = document.createElement("div");
      field.setAttribute("id", `${i}`);
      field.textContent = `${gameboard.contentOfField(i)}`;
      gameboardContainer.appendChild(field);
    }
  };

  const emptyGameboardContainer = () => {
    while (gameboardContainer.firstChild !== null) {
      gameboardContainer.removeChild(gameboardContainer.lastChild);
    }
  };

  return { renderGameboard };
})();

playGame();

console.log(`Thanks for playing!`);
