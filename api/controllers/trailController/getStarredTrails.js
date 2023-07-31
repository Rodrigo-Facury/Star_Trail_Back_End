const { User } = require('../../../database/models');

async function getStarredTrails(req, res, next) {
  const { id } = req.user;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    const starredTrails = await user.getTrails();

    return res.status(200).json({ starredTrails, message: 'Trilhas curtidas encontradas!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = getStarredTrails;
