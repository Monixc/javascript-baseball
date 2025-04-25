const { gameState, gameRecords } = require("./config");
const { save } = require("./save");
const {
  getRandomNum,
  checkExit,
  validateInput,
  rl,
  setWinCondition,
} = require("./utils");

function play() {
  // 게임 상태 초기화
  gameState.gameId++;
  gameState.startTime = new Date().toLocaleString();
  gameState.totalCount = 0;
  gameState.currentHistory = [];

  setWinCondition(() => {
    const randomNumbers = getRandomNum();
    console.log("\n컴퓨터가 숫자를 뽑았습니다");
    requestUserNumber(randomNumbers);
  });
}

function requestUserNumber(randomNumbers) {
  rl.question("\n숫자를 입력해주세요:", (input) => {
    if (checkExit(input)) {
      return;
    } else {
      if (validateInput(input)) {
        gameState.totalCount++;
        checkInput(randomNumbers, input);
      }
      requestUserNumber(randomNumbers);
      return;
    }
  });
}

function checkInput(computer, user) {
  let userList = user.split("").map(Number);

  let strike = userList.reduce(
    (s, digit, i) => s + (digit === computer[i] ? 1 : 0),
    0
  );

  let ball = userList.reduce(
    (b, digit, i) =>
      b + (digit !== computer[i] && computer.includes(digit) ? 1 : 0),
    0
  );

  resultText = "";
  if (strike == 0 && ball == 0) {
    resultText = "낫싱";
    console.log(resultText);
  } else {
    resultText =
      strike === 3
        ? `${strike}스트라이크\n 3개의 숫자를 모두 맞혔습니다`
        : `${ball}볼 ${strike} 스트라이크`;
    console.log(resultText);
  }

  gameState.currentHistory.push({ user: user, result: resultText });

  // 제한 횟수를 넘어가서 패배
  if (gameState.totalCount > gameState.winCondition) {
    console.log("\n컴퓨터가 승리했습니다.\n\n--------게임 종료-------");
    gameState.computerScore++;
    gameState.winner = "컴퓨터";
    const { start } = require("./main");
    save();
    start();
  }
  if (gameState.totalCount <= gameState.winCondition && strike === 3) {
    console.log("\n유저가 승리했습니다.\n\n--------게임 종료-------");
    gameState.userScore++;
    gameState.winner = "유저";
    const { start } = require("./main");
    save();
    start();
  }
}

module.exports = {
  play,
};
