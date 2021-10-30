let iconsToCompare = [];
//let iconsAreIdentical = true;

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

async function compareIcons(icons) {
  const [firstString, secondString] = icons;
  if (firstString === secondString) {
    const response = await fetch("/incrementGameScore");
    const incrementedScore = await response.text();
    console.log(incrementedScore);
  } else {
    const response = await fetch("/decrementGameScore");
    const decrementedScore = await response.text();
    console.log(decrementedScore);
  }
}

document.querySelector(".main-container").addEventListener("click", (e) => {
  const iconContainer = e.target.closest(".front-icon");

  if (!iconContainer) return;

  const iconLink = iconContainer.firstElementChild.firstElementChild;

  const [firstString, secondString] = iconLink.href.baseVal.split("#");

  iconsToCompare.push(secondString);

  if (iconsToCompare.length < 2) return;

  const copyOfIcons = iconsToCompare.splice(0, 2);
  compareIcons(copyOfIcons);
});

displayGameLevelOnPage();
displayIconsOnPage();

/*
<div class="icon-container">
  <div class="back-icon icon-same"></div>

  <div class="front-icon icon-same"></div>
</div>;

*/
