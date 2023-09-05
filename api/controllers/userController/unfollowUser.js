const { User, Follow } = require('../../../database/models');
const createToken = require('../../services/createToken');

async function unfollowUser(req, res, next) {
  const userId = req.user.id;
  const { followedUserId } = req.params;

  try {
    const userToUnfollow = await User.findByPk(followedUserId);

    if (!userToUnfollow) {
      return res.status(404).json({ message: 'Usuário que está deixando de ser seguido não encontrado!' });
    }

    const me = await User.findByPk(userId);

    await me.removeFollowing(userToUnfollow);
    
    const following = await me.getFollowing({
      attributes: ['id'],
    });
    
    const peopleIFollow = following.map(user => user.id);
    
    const myInfo = me.dataValues;

    const newToken = createToken({ ...myInfo, peopleIFollow: [...peopleIFollow]});

    return res.status(200).json({ newToken, message: 'Você está seguindo o usuário com sucesso!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = unfollowUser;
