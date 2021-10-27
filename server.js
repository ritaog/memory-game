import express from "express"

import memoryGameRouter from "./routes/memory-game-routes.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(memoryGameRouter);


app.listen(PORT, () => {
  console.log(`Server live on port ${PORT}`);
});
