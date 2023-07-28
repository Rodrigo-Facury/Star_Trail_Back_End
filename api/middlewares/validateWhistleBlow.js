const Joi = require('joi');

const validateWhistleBlow = (req, res, next) => {
  
  const schema = Joi.object({
    companyId: Joi.number().required(),
    text: Joi.string().required(),
    whistleBlowersName: Joi.string().allow(null, ''),
    whistleBlowersCompany: Joi.string().allow(null, ''),
    phoneNumber: Joi.string().allow(null, ''),
    email: Joi.string().allow(null, ''),
    channel: Joi.string().allow(null, ''),
  });
  
  const { error } = schema.validate(req.body);
  
  if (error) {
    console.error(error.details[0].message);
    return res.status(400).json({ message: error.details[0].message });
  }
  return next();
};

module.exports = validateWhistleBlow;
