const { Topic } = require('../../../database/models');

async function getTrailsByTopic(req, res, next) {
  const topicId = req.params.topicId;

  try {
    const topic = await Topic.findByPk(topicId);

    if (!topic) {
      return res.status(404).json({ message: 'Tópico não encontrado!' });
    }

    const trails = await topic.getTrails();

    return res.status(200).json({ trails, message: 'Trilhas encontradas para o tópico específico!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = getTrailsByTopic;
