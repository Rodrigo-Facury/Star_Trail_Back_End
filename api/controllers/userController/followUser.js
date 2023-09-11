const { User, Follow, Notification } = require('../../../database/models');
const createToken = require('../../services/createToken');

async function followUser(req, res, next) {
  const userId = req.user.id;
  const { followedUserId } = req.params;

  try {
    const followedUser = await User.findByPk(followedUserId);

    if (!followedUser) {
      return res.status(404).json({ message: 'Usuário que está sendo seguido não encontrado!' });
    }

    await Follow.create({ followerUserId: userId, followedUserId });

    const me = await User.findByPk(userId);

    const myInfo = me.dataValues;

    const following = await me.getFollowing({
      attributes: ['id'],
    });

    const peopleIFollow = following.map(user => user.id);

    await Notification.create({
      message: `@${me.username} começou a seguir você`,
      userId: followedUserId,
      goto: `/profile/${me.username}`
    });

    const newToken = createToken({ ...myInfo, peopleIFollow: [...peopleIFollow]});

    return res.status(200).json({ newToken, message: 'Você está seguindo o usuário com sucesso!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = followUser;
