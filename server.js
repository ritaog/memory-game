const express = require("express");

const memoryGameRouter = require("./routes/memory-game-routes.js");
const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.use(memoryGameRouter);

//this starts a server at port 3000
app.listen(PORT, () => {
  console.log(`Server live on port ${PORT}`);
});
