const { Op } = require('sequelize');
const { User } = require('../../../database/models');
const { Role } = require('../../../database/models');

async function getUsersByCompanyId(req, res, next) {
  try {
    const { companyId } = req.params;

    const users = await User.findAll({
      where: {
        companyId,
        [Op.or]: [
          { status: { [Op.not]: 'del' } },
          { status: 'Ativo' },
          { status: 'Inativo' }
        ]
      },
      attributes: { exclude: 'password' },
      include: [{
        model: Role,
        as: 'roles',
        through: { attributes: [] }
      }]
    });

    return res.status(200).json({ users: users.map(({ dataValues }) => dataValues), message: 'Usuários encontrados!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = getUsersByCompanyId;
