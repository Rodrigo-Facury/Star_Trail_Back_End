const { User } = require('../../../database/models');

async function getFollowers(req, res, next) {
  const { id } = req.user;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    const followers = await user.getFollowers({ attributes: { exclude: 'password' } });

    return res.status(200).json({ followers, message: 'Seguidores encontrados!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = getFollowers;
