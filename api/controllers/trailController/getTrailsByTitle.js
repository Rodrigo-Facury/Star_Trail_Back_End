const { Op } = require('sequelize');
const { Trail } = require('../../../database/models');

async function getTrailsByTitle(req, res, next) {
  const { title } = req.params;

  try {
    const trails = await Trail.findAll({
      where: {
        title: {
          [Op.iLike]: `%${title}%`,
        },
      },
      attributes: ['id', 'title']
    });

    if (!trails) {
      return res.status(404).json({ message: 'Trilha não encontrada!' });
    }

    return res.status(200).json({ trails, message: 'Trilha encontrada com sucesso!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = getTrailsByTitle;
