const { Role } = require('../../../database/models');

async function getCompanyRoles(_req, res, next) {
  try {
    const areas = await Role.findAll();

    return res.status(200).json({ areas: areas.map(({ dataValues }) => dataValues), message: 'Áreas encontradas!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = getCompanyRoles;
