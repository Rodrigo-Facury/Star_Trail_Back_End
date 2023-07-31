const { Trail, Step, Topic } = require('../../../database/models');
const { Op } = require('sequelize');

function normalizeTopicName(topicName) {
  return topicName.toLowerCase().replace(/[^\w\s]/gi, '').trim();
}

async function updateTrail(req, res, next) {
  const trailId = req.params.trailId;
  const userId = req.user.id;
  const { title, steps, topics } = req.body;

  try {
    const trail = await Trail.findByPk(trailId);

    if (!trail) {
      return res.status(404).json({ message: 'Trilha não encontrada!' });
    }

    if (trail.userId !== userId) {
      return res.status(403).json({ message: 'Acesso não autorizado! Você não é o proprietário desta trilha.' });
    }

    await trail.update({ title });

    await Promise.all(
      steps.map(async (step) => {
        if (step.id) {
          const existingStep = await Step.findByPk(step.id);
          if (existingStep) {
            return existingStep.update({
              description: step.description,
              position: step.position,
              trailId: trailId,
            });
          }
        } else {
          return Step.create({
            description: step.description,
            position: step.position,
            trailId: trailId,
          });
        }
      })
    );

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

    await trail.setTopics(allTopics);

    return res.status(200).json({ trail, message: 'Trilha editada com sucesso!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = updateTrail;
