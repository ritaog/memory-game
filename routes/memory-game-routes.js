import express from "express";

import * as memoryGameController from "../model/memory-game-controller.js";

const router = express.Router();

router.get("/viewGameLevel", async (req, res) => {
  const currentLevel = await memoryGameController.viewGameLevel();
  res.send(currentLevel.toString());
});

router.get("/updateGameLevel", (req, res) => {
  memoryGameController.updateGameLevel();
  const newLevel = memoryGameController.viewGameLevel();
  res.send(newLevel.toString());
});

router.get("/viewGameScore", async (req, res) => {
  const score = await memoryGameController.viewGameScore();
  res.send(score.toString());
});

router.get("/generateUniqueIcons", async (req, res) => {
  const uniqueIcons = await memoryGameController.viewShuffledIcons();
  res.json(uniqueIcons);
});

router.get("/incrementGameScore", async (req, res) => {
  memoryGameController.incrementGameScore();
  const newGameScore = await memoryGameController.viewGameScore();
  res.send(newGameScore.toString());
});

router.get("/decrementGameScore", async (req, res) => {
  memoryGameController.decrementGameScore();
  const newGameScore = await memoryGameController.viewGameScore();
  res.send(newGameScore.toString());
});
/*
router.get("/startNewGame", async (req, res) => {
  memoryGameController.updateGameLevel();
});
*/
router.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

export default router;
