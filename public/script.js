//variables
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const scoreElement = document.querySelectorAll(".score-num");
const instructionContainer = document.querySelector(".instruction");

let iconsToCompare = [];
let iconContainers = [];
//let allIconFrontContainer = [];
let level;
let count = 0;
let expectedMatchedPairs;

async function displayGameLevelOnPage() {
  const response = await fetch("/viewGameLevel");

  level = await response.text();

  Array.from(document.querySelectorAll(".level-num")).forEach(
    (el) => (el.textContent = level)
  );
}

async function incrementGameLevel() {
  const response = await fetch("/updateGameLevel");
  displayGameLevelOnPage();
}

async function displayScoreOnPage() {
  const response = await fetch("/viewGameScore");
  const score = await response.text();
  Array.from(document.querySelectorAll(".score-num")).forEach(
    (el) => (el.textContent = score)
  );
}

async function displayIconsOnPage() {
  const response = await fetch("/generateUniqueIcons");

  const icons = await response.json();
  expectedMatchedPairs = icons.length / 2;
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
      count++;
      document.querySelector(".former-game-level").textContent = level;
      expectedMatchedPairs === count ? showPopup() : "";
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

async function loadGameInstructions() {
  const response = await fetch("/gameInstructions");
  const instructions = await response.text();

  document.querySelector(".para").textContent = instructions;
}

//////////////////////////////////////////////////
//////////////// MODAL ////////////////////////
//handles showing of popup and overlay
function showPopup() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

//handles closing of popup and overlay
function hidePopup() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

//click event on button to hide popup
btnCloseModal.addEventListener("click", hidePopup);

//click event on overlay to hide popup
overlay.addEventListener("click", hidePopup);

//keypress event to hide popup
document.addEventListener("keydown", (event) => {
  //if the escape key is pressed and the popup is visible
  if (event.key === "Escape" && !modal.classList.contains("hidden"))
    hidePopup();
});

//help-button event listener

document.querySelector(".btn-help").addEventListener("click", () => {
  instructionContainer.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

document.querySelector(".close-instruction").addEventListener("click", () => {
  instructionContainer.classList.add("hidden");
  overlay.classList.add("hidden");
});

displayGameLevelOnPage();
displayScoreOnPage();
displayIconsOnPage();
loadGameInstructions();

function startGame() {
  count = 0;
  document.querySelector(".main-container").innerHTML = "";

  hidePopup();
  incrementGameLevel();
  displayIconsOnPage();
  displayScoreOnPage();
}

document.querySelector(".btn-next").addEventListener("click", startGame);
