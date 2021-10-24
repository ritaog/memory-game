async function displayGameLevel() {
  const response = await fetch("/updateGameLevel");

  const level = await response.text();

  document.querySelector(".level-num").textContent = level;
}

displayGameLevel();
