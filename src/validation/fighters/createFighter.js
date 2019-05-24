const Joi = require("@hapi/joi");

module.exports = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .max(50)
      .min(2)
      .required(),
    attack: Joi.number()
      .min(1)
      .max(7)
      .required(),
    defense: Joi.number()
      .min(1)
      .max(5)
      .required(),
    health: Joi.number()
      .min(30)
      .max(100)
      .required(true),
    source: Joi.string()
      .required()
      .max(500)
  });

  Joi.validate(req.body, schema, err => {
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
