const { Trail, User, Star, Notification } = require('../../../database/models');
const { gradeUser, setWinner } = require('../../services/userServices');

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

      await setWinner();

      return res.status(204).send();
    }

    const star = await Star.create({
      trailId: trail.id,
      userId: user.id,
    });

    const creator = await trail.getCreator();

    await Notification.create({
      message: `@${user.username} acabou de curtir sua trilha: ${trail.title}`,
      userId: creator.id,
      goto: `/?trailId=${trail.id}`
    });

    await setWinner();

    await gradeUser(trail.userId);

    return res.status(201).json({ star, message: 'Star criada com sucesso!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = starTrail;
