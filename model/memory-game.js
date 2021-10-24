const memoryGameData = require("./data.js");

let currentGameLevel = 0;

function updateGameLevel() {
  currentGameLevel++;
}

function gameLevel() {
  return currentGameLevel;
}

async function startGame() {
  updateGameLevel();
}

function generateUniqueIcons() {
  const newArr = [];
  do {
    const randNum = Math.floor(Math.random() * array.length);
    let icon = array[randNum];
    if (newArr.indexOf(icon) === -1) {
      newArr.push(icon);
    }
  } while (newArr.length < 3);
  return [...newArr, ...newArr];
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
  startGame,
  updateGameLevel,
  gameLevel,
};
