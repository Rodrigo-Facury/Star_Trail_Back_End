const { findByEmail } = require("../services/userServices");

async function checkUserByEmail(req, res, next) {
  try {
    const { email } = req.body;

    const foundUser = await findByEmail(email);

    if (foundUser) {
      return res.status(409).json({ message: 'Usuário já existe' });
    }

    next();
  } catch(err) {
    next(err);
  }
}

module.exports = checkUserByEmail;
