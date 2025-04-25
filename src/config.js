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
  userScore: 0,
};

const gameRecords = [];

module.exports = {
  START,
  EXIT,
  STATS,
  RECORD,
  RECORD_EXIT,
  gameState,
  gameRecords,
};
