async function displayGameLevelOnPage() {
  const response = await fetch("/updateGameLevel");

  const level = await response.text();

  document.querySelector(".level-num").textContent = level;
}

async function displayIconsOnPage() {
  const response = await fetch("/generateUniqueIcons");

  const icons = await response.json();

  icons.forEach((icon) => {
    const html = `
    <div class="game-icon-container">
        <svg class = "game-icon">
          <use class="game-icon__link" xlink:href = "img/sprite.svg#icon-${icon}"></use>
        </svg>
      </div>
    `;

    document.querySelector(".container").insertAdjacentHTML("afterbegin", html);
  });
}

/*

function implementGameScore() {
  document.querySelector(".container").addEventListener("click", handler);
  const iconContainer = e.target.closest(".game-icon-container");

  if (!iconContainer) return;
}

//function handler() {}
*/
displayGameLevelOnPage();
displayIconsOnPage();

/*
document.querySelector(".game-icons").href.baseVal.split("#")[1];
*/
