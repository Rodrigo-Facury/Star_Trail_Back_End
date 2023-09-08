const { User } = require('../../../database/models');

async function getUsersNotifications(req, res, next) {
  const { id } = req.user;

  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    const notifications = await user.getNotifications({ attributes: ['message', 'createdAt'] });

    return res.status(200).json({ notifications, message: 'Notificações encontradas com sucesso!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = getUsersNotifications;
