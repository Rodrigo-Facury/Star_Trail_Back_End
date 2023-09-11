const { User } = require('../../../database/models');

async function markSeenUsersNotifications(req, res, next) {
  const { id } = req.user;
  const { notificationId } = req.params;

  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    const notifications = await user.getNotifications({ where: { id: notificationId } });

    await notifications[0].update({ seen: true });

    return res.status(200).json({ message: 'Notificação visualizada com sucesso!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = markSeenUsersNotifications;
