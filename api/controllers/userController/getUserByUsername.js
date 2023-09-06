const { findByUsername } = require('../../services/userServices');


async function getUserByUsername(req, res, next) {
  const { username } = req.params;

  try {
    const user = await findByUsername(username);

    return res.status(200).json({ user, message: 'Usuário encontrado!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = getUserByUsername;
