const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const START = 1;
const EXIT = 9;
const STATS = 3;
const RECORD = 2;
const RECORD_EXIT = 0;

const gameState = {
  gameId: 0,
  startTime: "",
  endTime: "",
  totalCount: 0,
  currentHistory: [],
  winCondition: 5,
  winner: "",
  computerScore: 0,
  userScore: 0
}
  
const gameRecords = [];

//종료
function checkExit(input) {
  if (input == EXIT) {
    console.log("애플리케이션이 종료되었습니다");
    rl.close();
    return true;
  }
  return false;
}

//랜덤 숫자 함수
function getRandomNum() {
  //중복 제외
  let set = new Set();

  while (set.size < 3) {
    set.add(Math.floor(Math.random() * 9) + 1);
  }

  //객체 -> 배열
  const randomResult = Array.from(set);
  console.log(randomResult);
  return randomResult;
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
    resultText = ball === 0 ? `${strike}스트라이크\n\n3개의 숫자를 모두 맞혔습니다.` : `${ball}볼 ${strike} 스트라이크`;
    console.log(resultText);
  }

  gameState.currentHistory.push({user: user, result: resultText});

  if (strike == 3) {
    save();
    start();
  }

}

function requestUserNumber(randomNumbers) {

  // 제한 횟수를 넘어가서 패배
  if (gameState.totalCount > gameState.winCondition) {
    console.log("컴퓨터가 승리했습니다.\n\n--------게임 종료-------")
    gameState.computerScore++
    gameState.winner = "컴퓨터"
    save();
    start();
  }

  rl.question("숫자를 입력해주세요:", (input) => {
    if (checkExit(input)) {
      return;
    } else {
      if (validateInput(input)) {
        gameState.totalCount++
        checkInput(randomNumbers, input);
      }
      requestUserNumber(randomNumbers);
      return;
    }
  });
}

function play() {

  // 게임 상태 초기화
  gameState.gameId++;
  gameState.startTime = new Date().toLocaleString();
  gameState.totalCount = 0;
  gameState.currentHistory = [];

  // 승리 조건 설정
  rl.question("컴퓨터에게 승리하기 위해 몇번만에 성공해야 하나요?", (input) => {
    gameState.winCondition = parseInt(input);

    //숫자 뽐는 함수
    const randomNumbers = getRandomNum();
    console.log("컴퓨터가 숫자를 뽑았습니다");
    requestUserNumber(randomNumbers);
  })

}

//게임 시작
function start() {
  rl.question("게임을 시작하려면 1, 기록을 보려면 2, 통계를 보려면 3, 종료하려면 9를 입력하세요.", (input) => {
    if (input == START) {
      play();
    } else if (input == EXIT) {
      console.log("애플리케이션이 종료되었습니다.");
      rl.close();
    } else if (input == RECORD) {
      showRecord();
    } else if (input == STATS) {
      stats();
    } else {
      console.log("잘못된 입력입니다. 1 또는 9를 입력하세요");
      start();
    }
  });
}

function validateInput(input) {
  if (!/^\d{3}$/.test(input)) {
    console.log("3자리 숫자를 입력해주세요.")
    return false;
  }

  if (!(new Set(input.split("")).size === 3)) {
    console.log("숫자가 중복되지 않도록 입력해주세요.")
    return false;
  }

  return true;
  
}

function showRecord() {

  if (gameRecords.length === 0) {
    console.log("저장된 게임 기록이 없습니다.");
    start()
    return;
  }

  console.log("게임 기록");
  gameRecords.forEach((record) => console.log(`[${record.gameId}] / 시작시간: ${record.startTime} / 종료시간: ${record.endTime} / 횟수: ${record.totalCount} / 승리자: ${record.winner}`));

  showDetail();
}

function showDetail() {
  rl.question("확인할 게임 번호를 입력하세요 (종료하려면 0을 입력): \n", (input) => {
    if (input == RECORD_EXIT) {
      start();
      return;
    }

    const record = gameRecords.find((item) => item.gameId === parseInt(input));

    console.log(`${record.gameId}번 게임 결과`)
    record.currentHistory.forEach( (item) => console.log(`숫자를 입력해주세요: ${item.user}\n${item.result}`) );
    console.log("-------기록 종료-------")

    showDetail();

  })
}

function stats () {
  const minTotal = gameRecords.reduce( (a, b) => (a.totalCount < b.totalCount ? a: b) );
  const maxTotal = gameRecords.reduce( (a, b) => (a.totalCount > b.totalCount ? a: b) );
  const avgTotal = (gameRecords.reduce( (sum, item) => sum + item.totalCount, 0 ))/gameRecords.length;

  const minWinCondition = gameRecords.reduce( (a, b) => (a.winCondition < b.winCondition ? a: b) );
  const maxWinCondition = gameRecords.reduce( (a, b) => (a.winCondition > b.winCondition ? a: b) );
  const avgWinCondition = (gameRecords.reduce( (sum, item) => sum + item.winCondition, 0 ))/gameRecords.length;

  const computerWinPer = (gameState.computerScore/gameRecords.length)*100;
  const userWinPer = (gameState.userScore/gameRecords.length)*100;

  console.log(`가장 적은 횟수: ${minTotal.totalCount}회 - [${minTotal.gameId}]\n\n가장 많은 횟수: ${maxTotal.totalCount}회 - [${maxTotal.gameId}]\n\n평균 횟수: ${avgTotal}회`)
  console.log(`가장 많이 적용된 승리/패패 횟수: ${minWinCondition.winCondition}회\n\n가장 적게 적용된 승리/패패 횟수: ${maxWinCondition.winCondition}회\n\n적용된 승리/패패 횟수 평균: ${avgWinCondition}회`)
  console.log(`컴퓨터 전적: ${gameState.computerScore}승 / ${gameState.userScore}패 / ${computerWinPer}%\n\n사용자자 전적: ${gameState.userScore}승 / ${gameState.computerScore}패 / ${userWinPer}%\n\n--------통계 종료-------`)

  start();
  return;
}

function save() {
  gameState.endTime = new Date().toLocaleString();

  gameRecords.push({
    gameId: gameState.gameId,
    startTime: gameState.startTime,
    endTime: gameState.endTime,
    totalCount: gameState.totalCount,
    currentHistory: gameState.currentHistory,
    winCondition: gameState.winCondition,
    winner: gameState.winner
  })

  console.log(gameRecords)
}

start();
