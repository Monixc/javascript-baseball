const { gameState, gameRecords } = require("./config");

function save() {
  gameState.endTime = new Date().toLocaleString();

  gameRecords.push({
    gameId: gameState.gameId,
    startTime: gameState.startTime,
    endTime: gameState.endTime,
    totalCount: gameState.totalCount,
    currentHistory: gameState.currentHistory,
    winCondition: gameState.winCondition,
    winner: gameState.winner,
  });

  //   console.log(gameRecords);
}

module.exports = {
  save,
};
