const express = require("express");

const memoryGameController = require("../model/memory-game-controller.js");

const router = express.Router();

router.get("/updateGameLevel", async (req, res) => {
  const level = await memoryGameController.viewGameLevel();
  res.send(level.toString());
});

router.get("/generateUniqueIcons", async (req, res) => {
  const uniqueIcons = await memoryGameController.viewShuffledIcons();
  res.json(uniqueIcons);
});

router.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

module.exports = router;
