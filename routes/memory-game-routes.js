import express from "express";

import * as memoryGameController from "../model/memory-game-controller.js";

const router = express.Router();

router.get("/updateGameLevel", async (req, res) => {
  const level = await memoryGameController.viewGameLevel();
  res.send(level.toString());
});

router.get("/generateUniqueIcons", async (req, res) => {
  const uniqueIcons = await memoryGameController.viewShuffledIcons();
  res.json(uniqueIcons);
});

router.get("/incrementGameScore", async (req, res) => {
  memoryGameController.incrementGameScore();
  const newGameScore = await memoryGameController.viewGameScore();
  res.send(newGameScore.toString());
  //console.log(newGameScore);
});

router.get("/decrementGameScore", async (req, res) => {
  memoryGameController.decrementGameScore();
  const newGameScore = await memoryGameController.viewGameScore();
  res.send(newGameScore.toString());
  //console.log(newGameScore);
});

router.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

export default router;
