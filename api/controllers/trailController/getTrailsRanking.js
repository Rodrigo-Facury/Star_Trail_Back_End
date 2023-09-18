const { Trail, User, Star, Sequelize } = require('../../../database/models');

const ITEMS_PER_PAGE = 50;

async function getTrailsRanking(req, res, next) {
  const currentPage = req.query.page || 1;

  try {
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
          model: User,
          attributes: ['id', 'username', 'profilePicturePath', 'level'],
          as: 'creator',
        },
        {
          model: Star,
          as: 'stars',
          attributes: ['userId'],
        }
      ],
    });

    allTrails.sort((a, b) => b.dataValues.starsCount - a.dataValues.starsCount);

    let position = 1;

    const ranking = allTrails.map((trail, index) => {
      const newTrail = {};

      newTrail.id = trail.dataValues.id;

      
      if (index !== 0 && trail.dataValues.starsCount !== allTrails[index - 1].dataValues.starsCount) {
        position += 1;
      }
      
      newTrail.position = position;

      newTrail.profilePicturePath = trail.creator.profilePicturePath;

      newTrail.username = trail.dataValues.creator.username;

      newTrail.stars = trail.dataValues.starsCount;

      newTrail.title = trail.dataValues.title;

      return newTrail;
    });

    const firstItem = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = firstItem + ITEMS_PER_PAGE;

    const trails = ranking.slice(firstItem, end);

    const count = await Trail.count();

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

    return res.status(200).json({ trails, nextPage: Number(currentPage) + 1, totalPages, message: 'Ranking obtido com sucesso!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = getTrailsRanking;
