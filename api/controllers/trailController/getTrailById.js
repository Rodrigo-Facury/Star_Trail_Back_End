const { Trail, Step, Topic } = require('../../../database/models');

async function getTrailById(req, res, next) {
  const trailId = req.params.trailId;

  try {
    const trail = await Trail.findByPk(trailId, {
      include: [{
        model: Step,
        as: 'steps'
      },
      {
        model: Topic,
        through: { attributes: [] }
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
