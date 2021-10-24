const express = require("express");

const memoryGame = require("../model/memory-game.js");

const router = express.Router();

router.get("/updateGameLevel", async (req, res) => {
  const level = await memoryGame.gameLevel();
  res.send(level.toString());
});

router.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

module.exports = router;
