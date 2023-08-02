const { findByEmail, findByUsername } = require("../services/userServices");

async function checkUserByEmailAndUsername(req, res, next) {
  try {
    const { email, username } = req.body;

    const foundUsersEmail = await findByEmail(email);

    if (foundUsersEmail) {
      return res.status(409).json({ message: 'Usuário com este endereço de e-mail já existe' });
    }

    const foundUsersUsername = await findByUsername(username);

    if (foundUsersUsername) {
      return res.status(409).json({ message: 'Usuário com este username já existe' });
    }

    next();
  } catch(err) {
    next(err);
  }
}

module.exports = checkUserByEmailAndUsername;
