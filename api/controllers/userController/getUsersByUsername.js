const { Op, literal } = require('sequelize');
const { User } = require('../../../database/models');

function sanitizer(str) {
  return str.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();
}

async function getUsersByUsername(req, res, next) {
  const { username } = req.params;

  try {
    const formattedUsername = sanitizer(username);

    const users = await User.findAll({
      where: {
        [Op.or]: [
          literal(`LOWER(REPLACE(username, ' ', '')) LIKE '%${formattedUsername}%'`),
          literal(`LOWER(REPLACE(username, '_', '')) LIKE '%${formattedUsername}%'`),
          literal(`LOWER(REPLACE(username, '-', '')) LIKE '%${formattedUsername}%'`),
        ],
      },
      attributes: { exclude: ['password'] },
    });

    return res.status(200).json({ users, message: 'Usuários encontrados!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = getUsersByUsername;
