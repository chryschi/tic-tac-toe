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
  let winnerFound = false;
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
    displayController.enableGameboard();
    currentPlayer = playerOne;
    displayController.setGameMasterMessage(
      `It's ${currentPlayer.getName()}'s turn!`
    );

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
      displayController.setGameMasterMessage(
        `Congrats! ${gameOne.getWinner().getName()} has won!`
      );
      displayController.changeStartButtonName("NEW GAME");
    } else if (numberOfFilledFields === 9) {
      console.log(`It's a tie.`);
      winnerFound = true;
      displayController.setGameMasterMessage(`It's a tie.`);
      displayController.changeStartButtonName("NEW GAME");
    }

    console.log(`winner Found? : ${winnerFound}`);
  };

  const getWinnerFound = () => winnerFound;
  const getWinner = () => winnerPlayer;
  const playTurn = (event) => {
    const targetPosition = event.target.id;
    const currentPlayerName = currentPlayer.getName();

    if (gameboard.contentOfField(targetPosition) !== "") {
      displayController.setGameMasterMessage(
        `Sorry! Position ${targetPosition} is already filled! Try again, ${currentPlayerName}!`
      );
      console.log(`Sorry! Position ${targetPosition} is already filled!`);
    } else {
      currentPositionIndex = targetPosition;
      gameboard.setMarker(currentPlayer.symbol, currentPositionIndex);
      console.log(
        `${currentPlayerName} picked position ${currentPositionIndex}!`
      );
      displayController.renderGameboard();
      numberOfFilledFields++;
      console.log(numberOfFilledFields);
      console.log(`winnerfound?: ${winnerFound}`);
      if (numberOfFilledFields > 4) {
        checkForWinner();
      }
      if (!winnerFound) {
        switchPlayer();
        displayController.setGameMasterMessage(
          `It's ${currentPlayer.getName()}'s turn!`
        );
        displayController.enableGameboard();
        gameboard.displayBoard();
      }
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
  const gameMasterDisplay = document.querySelector("#game-master");

  const renderGameboard = () => {
    emptyGameboardContainer();
    createGameboardFields();
  };

  const emptyGameboardContainer = () => {
    while (gameboardContainer.firstChild !== null) {
      gameboardContainer.removeChild(gameboardContainer.lastChild);
    }
  };

  const createGameboardFields = () => {
    for (let i = 0; i < 9; i++) {
      const field = document.createElement("div");
      field.setAttribute("id", `${i}`);
      field.textContent = `${gameboard.contentOfField(i)}`;
      gameboardContainer.appendChild(field);
    }
  };

  const enableGameboard = () => {
    for (let i = 0; i < 9; i++) {
      const field = document.getElementById(`${i}`);
      field.addEventListener("click", gameOne.playTurn);
    }
  };

  const disableGameboard = () => {
    for (let i = 0; i < 9; i++) {
      const field = document.getElementById(`${i}`);
      field.removeEventListener("click", gameOne.playTurn);
    }
  };

  const setGameMasterMessage = (newMessage) => {
    gameMasterDisplay.textContent = newMessage;
  };

  const mountStartGameButton = () => {
    const startGameButton = document.createElement("button");
    startGameButton.setAttribute("id", "startGame-button");
    startGameButton.textContent = "START";
    startGameButton.addEventListener("click", () => {
      gameOne = game();
      gameOne.startGame();
      if (gameOne.getWinnerFound()) {
        startGameButton.textContent = "START";
      } else {
        startGameButton.textContent = "RESTART";
      }
    });
    document.body.appendChild(startGameButton);
  };

  const changeStartButtonName = (newName) => {
    const startGameButton = document.querySelector("#startGame-button");
    startGameButton.textContent = newName;
  };

  return {
    renderGameboard,
    enableGameboard,
    disableGameboard,
    setGameMasterMessage,
    mountStartGameButton,
    changeStartButtonName,
  };
})();

let gameOne;
displayController.mountStartGameButton();
gameboard.initBoard();
displayController.renderGameboard();
