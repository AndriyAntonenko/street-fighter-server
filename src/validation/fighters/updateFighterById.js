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
    attack: Joi.number()
      .min(1)
      .max(7),
    defense: Joi.number()
      .min(1)
      .max(5),
    health: Joi.number()
      .min(30)
      .max(100),
    source: Joi.string().max(500)
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
