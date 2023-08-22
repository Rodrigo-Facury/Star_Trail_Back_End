const { Trail, User, Star } = require('../../../database/models');

async function starTrail(req, res, next) {
  const { trailId } = req.params;
  const userId = req.user.id;

  try {
    const trail = await Trail.findByPk(trailId);
    if (!trail) {
      return res.status(404).json({ message: 'Trail não encontrada!' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    const existingStar = await Star.findOne({
      where: {
        trailId: trail.id,
        userId: user.id,
      },
    });

    if (existingStar) {
      await existingStar.destroy();

      return res.status(204).send();
    }

    const star = await Star.create({
      trailId: trail.id,
      userId: user.id,
    });

    return res.status(201).json({ star, message: 'Star criada com sucesso!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = starTrail;
