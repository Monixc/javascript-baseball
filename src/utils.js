const { EXIT } = require("./config");
const readline = require("readline");
const { gameState } = require("./config");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
  //   let set = new Set();
  //   while (set.size < 3) {
  //     set.add(Math.floor(Math.random() * 9) + 1);
  //   }
  //객체 -> 배열
  //   const randomResult = Array.from(set);

  let randomResult = arr.sort(() => Math.random() - 0.5).slice(0, 3);

  //   console.log(randomResult);
  return randomResult;
}

function validateInput(input) {
  if (!/^\d{3}$/.test(input)) {
    console.log("3자리 숫자를 입력해주세요.");
    return false;
  }

  if (!(new Set(input.split("")).size === 3)) {
    console.log("숫자가 중복되지 않도록 입력해주세요.");
    return false;
  }

  return true;
}

function setWinCondition(callback) {
  rl.question(
    "\n컴퓨터에게 승리하기 위해 몇번만에 성공해야 하나요?",
    (input) => {
      //빈 입력 체크
      if (!input || input.trim() === "") {
        console.log("입력값이 없습니다. 승리 조건을 입력해주세욤");
        setWinCondition(callback);
        return;
      }

      if (!/^\d+$/.test(input)) {
        console.log("승리 조건을 입력해주세요(숫자)");
        setWinCondition(callback);
        return;
      }

      gameState.winCondition = parseInt(input);
      callback();
    }
  );
}

module.exports = {
  checkExit,
  getRandomNum,
  validateInput,
  rl,
  setWinCondition,
};
