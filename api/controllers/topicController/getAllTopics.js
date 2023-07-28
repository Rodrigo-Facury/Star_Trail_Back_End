const { Op } = require('sequelize');
const { User } = require('../../../database/models');

async function getUsers(_req, res, next) {
  try {
    const users = await User.findAll({
      where: {
        companyId: 1,
        [Op.or]: [
          { status: { [Op.not]: 'del' } },
          { status: 'Ativo' },
          { status: 'Inativo' }
        ]
      },
      attributes: { exclude: 'password' }
    });

    return res.status(200).json({ users: users.map(({ dataValues }) => dataValues), message: 'Usuários encontrados!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = getUsers;
