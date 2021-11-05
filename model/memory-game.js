const iconExtensions = [
  "adjust",
  "aircraft",
  "attachment",
  "awareness-ribbon",
  "calculator",
  "camera",
  "clapperboard",

  "creative-commons-noncommercial-us",
  "dehaze",
  "download",
  "drink",
  "eye",
  "facebook",
  "flow-tree",
  "google-with-circle",
  "hand",
  "key",
  "landline",
  "leaf",
  "light-bulb",
  "linkedin-with-circle",
  "lock",
  "mail",
  "map",
  "mixi",
  "paypal",
  "pinterest-with-circle",
  "qq",
  "save",
  "signal",
  "smashing",
  "spotify-with-circle",
  "suitcase",
  "tv",
  "twitter",
  "user",
  "vimeo",

  "youtube",
];

const gameLevels = new Map([
  [1, 8],
  [2, 12],
  [3, 16],
  [4, 20],
  [5, 24],
  [6, 28],
  [7, 32],
  [8, 36],
  [9, 40],
  [10, 44],
]);

function getIconExtensions() {
  return iconExtensions;
}

function getMapOfGameLevels() {
  return gameLevels;
}

function generateRandomNumbers(elementSize) {
  return Math.floor(Math.random() * elementSize);
}

function shuffleUniqueIcons(icons) {
  const newIcons = icons.slice();
  return newIcons.sort(() => Math.random() - 0.5);
}

export {
  getIconExtensions,
  getMapOfGameLevels,
  generateRandomNumbers,
  shuffleUniqueIcons,
};
