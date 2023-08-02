const { User } = require('../../../database/models');

async function getUserById(req, res, next) {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    return res.status(200).json({ user, message: 'Usuário encontrado!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = getUserById;
