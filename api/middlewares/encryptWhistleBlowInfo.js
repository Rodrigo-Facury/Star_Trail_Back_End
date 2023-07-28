const { encrypt } = require("../../utils/cryptography");

const encryptWhistleBlowInfo = (req, _res, next) => {
  const {
    text,
    whistleBlowersCompany,
    phoneNumber,
    whistleBlowersName,
    email
  } = req.body;

  
  req.body.text = encrypt(text);

  if (whistleBlowersName) {
    req.body.whistleBlowersName = encrypt(whistleBlowersName);
  }

  if (whistleBlowersCompany) {
    req.body.whistleBlowersCompany = encrypt(whistleBlowersCompany);
  }

  if (phoneNumber) {
    req.body.phoneNumber = encrypt(phoneNumber);
  }

  if (email) {
    req.body.email = encrypt(email);
  }

  return next();
};

module.exports = encryptWhistleBlowInfo;

