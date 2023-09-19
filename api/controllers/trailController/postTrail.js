const { Topic, Trail, Step, Notification, User } = require('../../../database/models');
const { Op } = require('sequelize');

async function postTrail(req, res, next) {
  const { id: userId } = req.user;
  const { title, steps, topics } = req.body;

  const normalizedTopics = topics.map((topic) => topic.toLowerCase());

  try {
    const existingTopics = await Topic.findAll({
      where: {
        name: {
          [Op.in]: normalizedTopics,
        },
      },
    });

    const newTopics = normalizedTopics.filter((topic) => !existingTopics.some((existingTopic) => existingTopic.name === topic));

    const createdTopics = await Topic.bulkCreate(
      newTopics.map((topic) => ({ name: topic }))
    );

    const allTopics = [...existingTopics, ...createdTopics];


    const trail = await Trail.create({ title, userId });

    await Step.bulkCreate(
      steps.map((step) => ({
        description: step.description,
        position: step.position,
        trailId: trail.id,
      }))
    );

    await trail.addTopics(allTopics);

    await Notification.create({
      message: `Parabéns pela criação da trilha! Confira aqui sua posição no ranking!`,
      userId: userId,
      goto: '/ranking'
    });

    const user = await User.findByPk(userId);

    const followers = await user.getFollowers();

    followers.forEach(async ({ dataValues }) => {
      await Notification.create({
        message: `${user.username} acabou de postar uma trilha`,
        userId: dataValues.id,
        goto: `/?trailId=${trail.id}`
      });
    })

    return res.status(201).json({ trail, message: 'Trilha criada com sucesso!' });

  } catch (err) {
    return next(err);
  }
}

module.exports = postTrail;

