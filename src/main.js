const { START, EXIT, STATS, RECORD } = require("./config");
const { play } = require("./game");
const { showRecord, stats } = require("./stats");
const { rl } = require("./utils");

//게임 시작
function start() {
  rl.question(
    "게임을 시작하려면 1, 기록을 보려면 2, 통계를 보려면 3, 종료하려면 9를 입력하세요:",
    (input) => {
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
    }
  );
}

start();

module.exports = {
  start,
};
