const { Trail, User } = require('../../../database/models');

async function getTrailsByUser(req, res, next) {
  const userId = req.params.userId;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    const trails = await Trail.findAll({
      where: { userId },
    });

    return res.status(200).json({ trails, message: 'Trilhas encontradas para o usuário específico!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = getTrailsByUser;
