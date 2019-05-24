const Joi = require("@hapi/joi");

module.exports = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .max(50)
      .min(2)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    age: Joi.number()
      .max(150)
      .min(1)
      .required(),
    about: Joi.string()
      .max(350)
      .min(50)
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
