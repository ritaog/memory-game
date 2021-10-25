async function displayGameLevel() {
  const response = await fetch("/updateGameLevel");

  const level = await response.text();

  document.querySelector(".level-num").textContent = level;
}

async function displayIcons() {
  const response = await fetch("/generateUniqueIcons");

  const icons = await response.json();
  console.log(icons);
}

displayGameLevel();
displayIcons();
/*
console.log(document.querySelector(".game-icons").href.baseVal.split("#")[1]);
*/
