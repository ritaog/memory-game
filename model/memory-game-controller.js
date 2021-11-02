import * as memoryGame from "./memory-game.js";

let currentGameLevel = 1;
let shuffledIcons;
let currentGameScore = 0;
/*
async function updateGameLevel() {
  currentGameLevel++;
  return currentGameLevel;
}
*/

/*
async function viewGameLevel() {
  return currentGameLevel;
}
*/
function incrementGameScore() {
  currentGameScore += 10;
}

function decrementGameScore() {
  currentGameScore -= 1;
}

async function viewGameScore() {
  return currentGameScore;
}

function generateUniqueIcons(icons) {
  const uniqueIcons = [];

  const mapOfGameLevels = memoryGame.getMapOfGameLevels();
  const numOficons = mapOfGameLevels.get(currentGameLevel) / 2;

  do {
    const randNum = memoryGame.generateRandomNumbers(icons.length);
    let icon = icons[randNum];
    if (!uniqueIcons.includes(icon)) {
      uniqueIcons.push(icon);
    }
  } while (uniqueIcons.length < numOficons);

  return memoryGame.shuffleUniqueIcons([...uniqueIcons, ...uniqueIcons]);
}

function viewShuffledIcons() {
  const allGameIcons = memoryGame.getIconExtensions();
  shuffledIcons = generateUniqueIcons(allGameIcons);
  return shuffledIcons;
}

function updateGameLevel() {
  currentGameLevel++;
}

async function viewGameLevel() {
  return currentGameLevel;
}

//function initializeGame() {
// updateGameLevel();
//const allGameIcons = memoryGame.getIconExtensions();
// shuffledIcons = generateUniqueIcons(allGameIcons);
//}

//initializeGame();

export {
  // viewGameLevel,
  viewShuffledIcons,
  incrementGameScore,
  decrementGameScore,
  viewGameScore,
  viewGameLevel,
  updateGameLevel,
};
