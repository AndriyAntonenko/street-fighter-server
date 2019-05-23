const Joi = require("@hapi/joi");

module.exports = (req, res, next) => {
  const schemaForId = Joi.object().keys({
    id: Joi.string()
      .length(24)
      .hex()
      .required()
  });

  const shcamaForBody = Joi.object().keys({
    name: Joi.string()
      .max(50)
      .min(2),
    email: Joi.string().email(),
    age: Joi.number()
      .max(150)
      .min(1),
    about: Joi.string()
      .max(350)
      .min(50)
  });

  Joi.validate(req.params, schemaForId, err => {
    if (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
    }
  });

  Joi.validate(req.body, shcamaForBody, err => {
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
