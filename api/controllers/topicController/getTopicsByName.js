const { Op } = require('sequelize');
const { Topic, Trail } = require('../../../database/models');

async function getTopicsByName(req, res, next) {
  const { name } = req.params;

  try {
    const topics = await Topic.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      attributes: ['id', 'name'],
      include: {
        model: Trail,
        through: { attributes: [] },
        attributes: ['id'],
      }
    });

    console.log(topics)

    const topicsWithTrailCount = topics.map(({ dataValues }) => {
      return {
        id: dataValues.id,
        name: dataValues.name,
        trailCount: dataValues.Trails.length,
      };
    });

    return res.status(200).json({ topicsWithTrailCount, message: 'Tópicos foram recuperados com sucesso!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = getTopicsByName;
