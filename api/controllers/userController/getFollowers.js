const { User } = require('../../../database/models');

async function getFollowers(req, res, next) {
  const { id } = req.user;

  try {
    const user = await User.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: 'Followers',
          attributes: { exclude: 'password' }
        }
      ],
      attributes: { exclude: 'password' }
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    const followers = user.Followers;

    return res.status(200).json({ followers, message: 'Seguidores encontrados!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = getFollowers;
