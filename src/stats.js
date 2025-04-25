const { gameState, gameRecords, RECORD_EXIT } = require("./config");
const { rl } = require("./utils");

function showRecord() {
  if (gameRecords.length === 0) {
    console.log("저장된 게임 기록이 없습니다.");

    const { start } = require("./main");
    start();
    return;
  }

  console.log("\n게임 기록");
  //   gameRecords.forEach((record) =>
  //     console.log(
  //       `[${record.gameId}] / 시작시간: ${record.startTime} / 종료시간: ${record.endTime} / 횟수: ${record.totalCount} / 승리자: ${record.winner}`
  //     )
  // );

  const mappedRecords = gameRecords
    .map(
      (record) =>
        `[${record.gameId}] / 시작시간: ${record.startTime} / 종료시간: ${record.endTime} / 횟수: ${record.totalCount} / 승리자: ${record.winner}`
    )
    .join(`\n`);

  console.log(mappedRecords);

  showDetail();
}

function showDetail() {
  rl.question(
    "\n확인할 게임 번호를 입력하세요 (종료하려면 0을 입력): \n",
    (input) => {
      if (input == RECORD_EXIT) {
        const { start } = require("./main");
        start();
        return;
      }

      const record = gameRecords.find(
        (item) => item.gameId === parseInt(input)
      );

      if (!record) {
        console.log("\n선택한 게임 번호가 존재하지 않습니다");
        showDetail();
        return;
      }

      console.log(`\n${record.gameId}번 게임 결과`);
      //   record.currentHistory.forEach((item) =>
      //     console.log(`숫자를 입력해주세요: ${item.user}\n${item.result}`)
      //   );

      const mappedHistory = record.currentHistory
        .map((item) => `숫자를 입력해주세요: ${item.user}\n${item.result}`)
        .join(`\n`);

      console.log(mappedHistory);
      console.log("\n-------기록 종료-------");

      showDetail();
    }
  );
}

function stats() {
  const minTotal = gameRecords.reduce((a, b) =>
    a.totalCount < b.totalCount ? a : b
  );
  const maxTotal = gameRecords.reduce((a, b) =>
    a.totalCount > b.totalCount ? a : b
  );
  const avgTotal = (
    gameRecords.reduce((sum, item) => sum + item.totalCount, 0) /
    gameRecords.length
  ).toFixed(2);

  const minWinCondition = gameRecords.reduce((a, b) =>
    a.winCondition < b.winCondition ? a : b
  );
  const maxWinCondition = gameRecords.reduce((a, b) =>
    a.winCondition > b.winCondition ? a : b
  );
  const avgWinCondition = (
    gameRecords.reduce((sum, item) => sum + item.winCondition, 0) /
    gameRecords.length
  ).toFixed(2);

  const computerWinPer = (
    (gameState.computerScore / gameRecords.length) *
    100
  ).toFixed(2);

  const userWinPer = ((gameState.userScore / gameRecords.length) * 100).toFixed(
    2
  );

  console.log(
    `\n가장 적은 횟수: ${minTotal.totalCount}회 - [${minTotal.gameId}]\n가장 많은 횟수: ${maxTotal.totalCount}회 - [${maxTotal.gameId}]\n평균 횟수: ${avgTotal}회\n`
  );
  console.log(
    `가장 많이 적용된 승리/패패 횟수: ${minWinCondition.winCondition}회\n가장 적게 적용된 승리/패패 횟수: ${maxWinCondition.winCondition}회\n적용된 승리/패패 횟수 평균: ${avgWinCondition}회\n`
  );
  console.log(
    `컴퓨터 전적: ${gameState.computerScore}승 / ${gameState.userScore}패 / ${computerWinPer}%\n사용자 전적: ${gameState.userScore}승 / ${gameState.computerScore}패 / ${userWinPer}%\n\n--------통계 종료-------\n`
  );

  const { start } = require("./main");
  start();
  //   return;
}

module.exports = {
  stats,
  showRecord,
};
