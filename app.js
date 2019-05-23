const express = require("express");
const config = require("config");

const errorHandler = require("./src/middlewares/errorHandler");
const middlewares = require("./src/middlewares");

const userRouter = require("./src/routers/users");

const app = express();

require("./src/libs/mongoose");

middlewares(app);

app.use("/api", userRouter);

errorHandler(app);

app.listen(config.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server was running on ${config.PORT} port`);
});
