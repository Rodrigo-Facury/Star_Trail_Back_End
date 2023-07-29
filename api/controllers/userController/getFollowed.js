const { User } = require('../../../database/models');

async function getFollowed(req, res, next) {
  const { id } = req.user;

  try {
    const user = await User.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: 'Following',
          attributes: { exclude: 'password' }
        }
      ],
      attributes: { exclude: 'password' }
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    const followed = user.Following;

    return res.status(200).json({ followed, message: 'Perfis seguidos encontrados!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = getFollowed;
