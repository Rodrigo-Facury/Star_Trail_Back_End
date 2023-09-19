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

    const creator = await trail.getCreator();

    const existingStar = await Star.findOne({
      where: {
        trailId: trail.id,
        userId: user.id,
      },
    });

    if (existingStar) {
      await existingStar.destroy();

      await setWinner();

      if (user.id === creator.id) {
        await user.update({ isCompetitor: true, reason: '' });

        await Notification.create({
          message: 'Você descurtiu sua trilha e agora está de volta ao jogo!',
          userId: creator.id,
          goto: '/ranking'
        });
      }

      return res.status(204).send();
    }

    const star = await Star.create({
      trailId: trail.id,
      userId: user.id,
    });

    if (user.id === creator.id) {
      console.log(user)

      await user.update({ isCompetitor: false, reason: 'Curtiu a própria trilha.' });

      await Notification.create({
        message: 'Que pena! Você curtiu sua própria trilha e isso te desclassifica da competição. Para voltar ao jogo, descurta!',
        userId: creator.id,
        goto: '/ranking'
      });
    } else {
      await setWinner();

      await Notification.create({
        message: `@${user.username} acabou de curtir sua trilha: ${trail.title}`,
        userId: creator.id,
        goto: `/?trailId=${trail.id}`
      });

      await Notification.create({
        message: `Confira sua posição no ranking!`,
        userId: creator.id,
        goto: `/ranking`
      });
    }

    await gradeUser(trail.userId);

    return res.status(201).json({ star, message: 'Star criada com sucesso!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = starTrail;
