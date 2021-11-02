let iconsToCompare = [];
let iconContainers = [];

const scoreElement = document.querySelector(".score-num");

async function displayGameLevelOnPage() {
  const response = await fetch("/viewGameLevel");

  const level = await response.text();

  document.querySelector(".level-num").textContent = level;
}

async function incrementGameLevel() {
  const response = await fetch("/updateGameLevel");

  //const newScore = await response;
  console.log("Game level has been updated");
  displayGameLevelOnPage();
}

async function displayScoreOnPage() {
  const response = await fetch("/viewGameScore");
  const score = await response.text();
  document.querySelector(".score-num").textContent = score;
}

async function displayIconsOnPage() {
  const response = await fetch("/generateUniqueIcons");

  const icons = await response.json();
  console.log(icons.length);
  console.log(icons);
  icons.forEach((icon) => {
    const html = `
  <div class="icon-container">

    <div class="back-icon ">
        <svg class = "game-icon">
          <use class="game-icon__link" xlink:href = "img/sprite.svg#icon-${icon}"></use>
        </svg>   
    </div>
    
    <div class="front-icon ">
        <svg class = "game-icon">
          <use class="game-icon__link" xlink:href = "img/sprite.svg#icon-help"></use>
        </svg>
      </div>
    
  </div>  
  
    `;

    document
      .querySelector(".main-container")
      .insertAdjacentHTML("beforeend", html);
  });
}

document
  .querySelector(".main-container")
  .addEventListener("click", async (e) => {
    const frontIconContainer = e.target.closest(".front-icon");

    if (!frontIconContainer) return;

    const backIconContainer = frontIconContainer.previousElementSibling;

    iconContainers.push({
      first: frontIconContainer,
      second: backIconContainer,
    });

    frontIconContainer.classList.add("icon-covering");
    if (iconContainers.length < 2) return;

    const iconsToCompare = iconContainers.splice(0, 2);

    const iconStrings = iconsToCompare.map((iconLink) => {
      const element = iconLink.second.firstElementChild.firstElementChild;
      return element.href.baseVal.split("#")[1];
    });

    const [firstString, secondString] = iconStrings;

    if (firstString === secondString) {
      const response = await fetch("/incrementGameScore");
      const incrementedScore = await response.text();
      scoreElement.textContent = incrementedScore;
      displayScoreOnPage();
    } else {
      const response = await fetch("/decrementGameScore");
      const decrementedScore = await response.text();
      scoreElement.textContent = decrementedScore;

      iconsToCompare.forEach((iconLink) => {
        setTimeout(() => {
          iconLink.first.classList.remove("icon-covering");
        }, 800);
      });
      displayScoreOnPage();
    }
  });

displayGameLevelOnPage();
displayScoreOnPage();
displayIconsOnPage();

function startGame() {
  document.querySelector(".main-container").innerHTML = "";
  incrementGameLevel();
  displayIconsOnPage();
  //displayGameLevelOnPage();
  displayScoreOnPage();
}

document.querySelector(".btn-next").addEventListener("click", startGame);
