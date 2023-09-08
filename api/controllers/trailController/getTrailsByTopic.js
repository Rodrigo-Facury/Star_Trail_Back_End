const { Step, User, Star, Topic, Sequelize } = require('../../../database/models');

async function getTrailsByTopic(req, res, next) {
  const topicId = req.params.topicId;

  try {
    const topic = await Topic.findByPk(topicId);

    if (!topic) {
      return res.status(404).json({ message: 'Tópico não encontrado!' });
    }

    const trails = await topic.getTrails({
      attributes: {
        include: [
          [
            Sequelize.literal(`(
              SELECT COUNT(*) 
              FROM "Stars" 
              WHERE "Stars"."trailId" = "Trail"."id"
            )`),
            'starsCount'
          ]
        ],
      },
      include: [
        {
          model: Step,
          as: 'steps',
          attributes: { exclude: 'trailId' },
        },
        {
          model: User,
          attributes: ['id', 'username', 'profilePicturePath', 'level'],
          as: 'creator',
        },
        {
          model: Star,
          as: 'stars',
          attributes: ['userId'],
        },
        {
          model: Topic,
          through: { attributes: [] },
          attributes: ['name'],
        }
      ],
    });

    return res.status(200).json({ trails, message: 'Trilhas encontradas para o tópico específico!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = getTrailsByTopic;
