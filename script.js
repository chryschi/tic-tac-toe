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
    return false;
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
  let currentPositionIndex = null;
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

    currentPlayer = playerOne;

    console.log("Nice! Let's begin!");
    gameboard.displayBoard();
  };

  const checkForWinner = () => {
    winnerFound = gameboard.checkWin(
      currentPlayer.symbol,
      currentPositionIndex
    );
    if (winnerFound) {
      winnerPlayer = currentPlayer;
      console.log(`winner: ${winnerPlayer.getName()}`);
      console.log(`Congrats! ${gameOne.getWinner().getName()} has won!`);
      displayController.mountNewGameButton();
      displayController.unableGameboard();
    } else {
      if (numberOfFilledFields === 9) {
        console.log(`It's a tie.`);
        displayController.mountNewGameButton();
        displayController.unableGameboard();
      }
    }
    console.log(`winner Found? : ${winnerFound}`);
  };

  const getWinnerFound = () => winnerFound;
  const getWinner = () => winnerPlayer;
  const playTurn = (event) => {
    const targetPosition = event.target.id;
    if (gameboard.contentOfField(targetPosition) !== "") {
      console.log(`Sorry! Position ${targetPosition} is already filled!`);
    } else {
      const currentPlayerName = currentPlayer.getName();

      currentPositionIndex = targetPosition;
      gameboard.setMarker(currentPlayer.symbol, currentPositionIndex);
      console.log(
        `${currentPlayerName} picked position ${currentPositionIndex}!`
      );
      displayController.renderGameboard();
      numberOfFilledFields++;
      console.log(numberOfFilledFields);
      if (numberOfFilledFields > 4) {
        checkForWinner();
      }

      switchPlayer();
      gameboard.displayBoard();
    }
  };

  return {
    startGame,
    playTurn,
    getCurrentPlayer,
    getWinnerFound,
    getWinner,
  };
}

const displayController = (function () {
  const gameboardContainer = document.querySelector("#gameboard-container");

  const renderGameboard = () => {
    emptyGameboardContainer();
    for (let i = 0; i < 9; i++) {
      const field = document.createElement("div");
      field.setAttribute("id", `${i}`);
      field.textContent = `${gameboard.contentOfField(i)}`;
      field.addEventListener("click", gameOne.playTurn);
      gameboardContainer.appendChild(field);
    }
  };

  const emptyGameboardContainer = () => {
    while (gameboardContainer.firstChild !== null) {
      gameboardContainer.removeChild(gameboardContainer.lastChild);
    }
  };

  const unableGameboard = () => {
    for (let i = 0; i < 9; i++) {
      const field = document.getElementById(`${i}`);
      field.removeEventListener("click", gameOne.playTurn);
    }
  };

  const mountNewGameButton = () => {
    const newGameButton = document.createElement("button");
    newGameButton.textContent = "NEW GAME";
    newGameButton.addEventListener("click", () => {
      unmountNewGameButton();
      gameOne = game();
      gameOne.startGame();
    });
    document.body.appendChild(newGameButton);
  };

  const unmountNewGameButton = () => {
    const newGameButton = document.querySelector("button");
    document.body.removeChild(newGameButton);
  };

  return {
    renderGameboard,
    mountNewGameButton,
    unmountNewGameButton,
    unableGameboard,
  };
})();

let gameOne = game();
gameOne.startGame();

console.log(`Thanks for playing!`);
