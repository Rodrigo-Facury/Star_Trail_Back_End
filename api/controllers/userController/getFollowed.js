const { User } = require('../../../database/models');

async function getFollowed(req, res, next) {
  const { id } = req.user;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    const followed = await user.getFollowing({ attributes: { exclude: 'password' } });

    return res.status(200).json({ followed, message: 'Perfis seguidos encontrados!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = getFollowed;
