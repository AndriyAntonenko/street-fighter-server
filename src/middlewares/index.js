const bodyParser = require("./bodyParser");
const logger = require("./logger");
const cors = require("./cors");

module.exports = app => {
  bodyParser(app);
  app.use(logger);
  app.use(cors);
};
