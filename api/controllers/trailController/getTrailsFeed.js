const { Trail, Step, User, Star } = require('../../../database/models');

const ITEMS_PER_PAGE = 10;

async function getTrailsFeed(req, res, next) {
  const currentPage = req.query.page || 1;

  try {
    const { count, rows: trails } = await Trail.findAndCountAll({
      offset: (currentPage - 1) * ITEMS_PER_PAGE,
      limit: ITEMS_PER_PAGE,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Step,
          as: 'steps',
          attributes: { exclude: 'trailId' },
          order: [['position', 'ASC']],
        },
        {
          model: User,
          attributes: ['id', 'username', 'profilePicturePath', 'level'],
          as: 'creator',
        },
        {
          model: Star,
          as: 'stars',
          attributes: ['id'],
        }
      ],
    });

    trails.forEach(trail => {
      trail.dataValues.starsCount = trail.stars.length;
      delete trail.dataValues.stars;
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

    return res.status(200).json({ trails, currentPage, totalPages, message: 'Feed de trilhas obtido com sucesso!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = getTrailsFeed;
