const { decrypt } = require("../../utils/cryptography");

const decryptWhistleBlowInfo = (wb) => {
  const {
    text,
    whistleBlowersCompany,
    phoneNumber,
    whistleBlowersName,
    email
  } = wb;

  const decryptedWb = wb;
  
  decryptedWb.text = decrypt(text);

  if (whistleBlowersName) {
    decryptedWb.whistleBlowersName = decrypt(whistleBlowersName);
  }

  if (whistleBlowersCompany) {
    decryptedWb.whistleBlowersCompany = decrypt(whistleBlowersCompany);
  }

  if (phoneNumber) {
    decryptedWb.phoneNumber = decrypt(phoneNumber);
  }

  if (email) {
    decryptedWb.email = decrypt(email);
  }

  return decryptedWb;
};

module.exports = decryptWhistleBlowInfo;

