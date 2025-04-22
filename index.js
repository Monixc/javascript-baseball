const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//종료
function checkExit(input) {
  if (input == 9) {
    console.log("애플리케이션이 종료되었습니다");
    rl.close();
  }
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

  if (strike == 0 && ball == 0) {
    console.log("낫싱");
    requestUserNumber(computer);
  } else if (strike == 3) {
    console.log("3개의 스트라이크를 모두 맞히셨습니다");
    start();
  } else {
    console.log(`${ball}볼 ${strike}스크라이크`);
    requestUserNumber(computer);
  }

  return { strike, ball };
}

function requestUserNumber(randomNumbers) {
  rl.question("숫자를 입력해주세요:", (input) => {
    checkExit(input);
    //숫자 3자리 입력
    //유효성 검사

    const { strike, ball } = checkInput(randomNumbers, input);
  });
}

function play() {
  //숫자 뽐는 함수
  const randomNumbers = getRandomNum();
  console.log("컴퓨터가 숫자를 뽑았습니다");
  requestUserNumber(randomNumbers);
}

//게임 시작
function start() {
  rl.question("게임을 시작하려면 1, 종료하려면 9를 입력하세요.", (input) => {
    if (input == 1) {
      play();
    } else if (input == 9) {
      console.log("애플리케이션이 종료되었습니다.");
      rl.close();
    } else {
      console.log("잘못된 입력입니다. 1 또는 9를 입력하세요");
      start();
    }
  });
}

start();

// 수정 필요사항
// 1. 게임 도중 9 클릭 시 발생하는 오류

// E:\javascript-baseball>node index.js
//     at Interface.question (node:readline:158:20)
//     at requestUserNumber (E:\javascript-baseball\index.js:59:6)
//     at checkInput (E:\javascript-baseball\index.js:46:5)
//     at E:\javascript-baseball\index.js:64:30
//     at [_onLine] [as _onLine] (node:internal/readline/interface:415:7)
//     at [_line] [as _line] (node:internal/readline/interface:888:18)
//     at [_ttyWrite] [as _ttyWrite] (node:internal/readline/interface:1266:22)
//     at ReadStream.onkeypress (node:internal/readline/interface:265:20)
//     at ReadStream.emit (node:events:519:28) {
//   code: 'ERR_USE_AFTER_CLOSE'
// }

// Node.js v20.16.0

// 2. 숫자 입력 없이 enter 해도 낫싱 나오는 문제 (유효성 필요)
// 3. 입력하는 숫자 자릿수에 대한 유효성 검증 필요
// 4. requestUserNumber을 더 깔끔하게 호출할 수 있는 방법
// 5. 효율적인 구조
