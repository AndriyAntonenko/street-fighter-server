const Joi = require("@hapi/joi");

module.exports = (req, res, next) => {
  const schema = Joi.object().keys({
    id: Joi.string()
      .length(24)
      .hex()
      .required()
  });

  Joi.validate(req.params, schema, err => {
    if (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
    } else {
      next();
    }
  });
};
