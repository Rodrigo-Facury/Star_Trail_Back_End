const { User, Follow } = require('../../../database/models');

async function followUser(req, res, next) {
  const userId = req.user.id;
  const { followedUserId } = req.params;

  try {
    const followedUser = await User.findByPk(followedUserId);

    if (!followedUser) {
      return res.status(404).json({ message: 'Usuário que está sendo seguido não encontrado!' });
    }

    await Follow.create({ followerUserId: userId, followedUserId });

    return res.status(200).json({ message: 'Você está seguindo o usuário com sucesso!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = followUser;
