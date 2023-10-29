const gameBoard = (function () {
  let gameBoardContent = [];

  const setMarker = (marker, positionIndex) => {
    gameBoardContent[positionIndex] = marker;
  };

  return { setMarker };
})();

function createPlayer() {
  return;
}
