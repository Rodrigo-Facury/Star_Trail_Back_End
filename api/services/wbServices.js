const decryptWhistleBlowInfo = (whistleBlow) => {
  if (whistleBlow && whistleBlow.text) {
    whistleBlow.text = decrypt(whistleBlow.text);
  }

  if (whistleBlow.whistleBlowersName) {
    whistleBlow.whistleBlowersName = decrypt(whistleBlow.whistleBlowersName);
  }

  if (whistleBlow.whistleBlowersCompany) {
    whistleBlow.whistleBlowersCompany = decrypt(whistleBlow.whistleBlowersCompany);
  }

  if (whistleBlow.phoneNumber) {
    whistleBlow.phoneNumber = decrypt(whistleBlow.phoneNumber);
  }

  if (whistleBlow.email) {
    whistleBlow.email = decrypt(whistleBlow.email);
  }

  return whistleBlow;
};

module.exports = {
  decryptWhistleBlowInfo
};
