const iconExtensions = ["global", "start", "iconname"];

const gameLevels = new Map([
  [1, 6],
  [2, 8],
  [3, 10],
  [4, 12],
  [5, 14],
  [6, 16],
  [7, 18],
  [8, 20],
  [9, 22],
  [10, 24],
]);

function getIconExtensions() {
  return iconExtensions;
}

function getGameLevels() {
  return gameLevels;
}

function generateRandomNumbers(length) {
  return Math.floor(Math.random() * length);
}

module.exports = { getIconExtensions, getGameLevels, generateRandomNumbers };
