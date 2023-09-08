const { Trail, Step, User, Star, Topic, Sequelize } = require('../../../database/models');

async function getTrailById(req, res, next) {
  const trailId = req.params.trailId;

  try {
    const trail = await Trail.findByPk(trailId, {
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

    if (!trail) {
      return res.status(404).json({ message: 'Trilha não encontrada!' });
    }

    return res.status(200).json({ trail, message: 'Trilha encontrada com sucesso!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = getTrailById;
