const { Trail, Step, User, Star, Topic, Sequelize } = require('../../../database/models');

const ITEMS_PER_PAGE = 10;

async function getTrailsFeed(req, res, next) {
  const currentPage = req.query.page || 1;
  const orderBy = req.query.orderBy || 'createdAt';

  let trails;
  let count;

  try {
    if (orderBy === 'starsCount') {
      const { count: countAll, rows } = await Trail.findAndCountAll({
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
        offset: (currentPage - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
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

      count = countAll;
      trails = rows;
      trails.sort((a, b) => b.dataValues.starsCount - a.dataValues.starsCount);
    } else {
      const { count: countAll, rows } = await Trail.findAndCountAll({
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
        order: [['createdAt', 'DESC']],
        offset: (currentPage - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
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

      count = countAll;
      trails = rows;
    }

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    
    return res.status(200).json({ trails, currentPage, totalPages, message: 'Feed de trilhas obtido com sucesso!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = getTrailsFeed;
