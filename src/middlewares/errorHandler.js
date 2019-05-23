const createError = require("http-errors");

module.exports = app => {
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404, "Not Found"));
  });

  // error handler
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message,
      error: process.env.NODE_ENV !== "production" ? err : null
    });
  });
};
