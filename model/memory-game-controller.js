const memoryGame = require("./memory-game.js");

let currentGameLevel = 0;
let shuffledIcons;

function updateGameLevel() {
  currentGameLevel++;
}

function viewGameLevel() {
  return currentGameLevel;
}

function generateUniqueIcons(icons) {
  const uniqueIcons = [];
  const mapOfGameLevels = memoryGame.getMapOfGameLevels();
  const numOficons = mapOfGameLevels.get(currentGameLevel) / 2;

  do {
    const randNum = memoryGame.generateRandomNumbers(icons.length);
    let icon = icons[randNum];
    if (uniqueIcons.indexOf(icon) === -1) {
      uniqueIcons.push(icon);
    }
  } while (uniqueIcons.length < numOficons);

  return memoryGame.shuffleUniqueIcons([...uniqueIcons, ...uniqueIcons]);
}

function viewShuffledIcons() {
  return shuffledIcons;
}

function startGame() {
  updateGameLevel();
  const allGameIcons = memoryGame.getIconExtensions();
  shuffledIcons = generateUniqueIcons(allGameIcons);
}

//html has to be entire html for each box, not just svg
/*
const html = `
    <svg class = "box-icon">
    <use xlink:href = "img/sprite.svg#icon-${extension}"
    `;
return html;

*/
startGame();
module.exports = {
  viewGameLevel,
  viewShuffledIcons,
};
