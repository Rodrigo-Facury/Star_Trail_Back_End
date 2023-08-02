const { Topic, Trail, Step } = require('../../../database/models');
const { Op } = require('sequelize');

function normalizeTopicName(topicName) {
  return topicName.toLowerCase().replace(/[^\w\s]/gi, '').trim();
}

async function postTrail(req, res, next) {
  const { id: userId } = req.user;
  const { title, steps, topics } = req.body;

  try {
    const normalizedTopics = topics.map((topic) => normalizeTopicName(topic));

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

    return res.status(201).json({ trail, message: 'Trilha criada com sucesso!' });

  } catch (err) {
    return next(err);
  }
}

module.exports = postTrail;

