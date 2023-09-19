const { Trail, Step, User, Star, Topic, Sequelize } = require('../../../database/models');

const ITEMS_PER_PAGE = 10;

async function getTrailsFeed(req, res, next) {
  const currentPage = req.query.page || 1;
  const orderBy = req.query.orderBy || 'createdAt';

  let trails;

  try {
    if (orderBy === 'starsCount') {
      const allTrails = await Trail.findAll({
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

      allTrails.sort((a, b) => b.dataValues.starsCount - a.dataValues.starsCount);

      const firstItem = (currentPage - 1) * ITEMS_PER_PAGE;
      const end = firstItem + ITEMS_PER_PAGE;

      trails = allTrails.slice(firstItem, end);
    } else {
      const queryTrails = await Trail.findAll({
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
            attributes: ['id', 'username', 'profilePicturePath', 'level', 'isWinner'],
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

      trails = queryTrails;
    }

    const count = await Trail.count();

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    
    return res.status(200).json({ trails, nextPage: Number(currentPage) + 1, totalPages, message: 'Feed de trilhas obtido com sucesso!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = getTrailsFeed;
