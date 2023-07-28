const { Op } = require('sequelize');
const { Company } = require('../../../database/models');
const { User } = require('../../../database/models');

async function getClients(_req, res, next) {
  try {
    const clients = await Company.findAll({
      where: {
        status: 'client'
      },
      include: [{
        model: User,
        as: 'users',
        through: { attributes: [] },
        attributes: ['id', 'name', 'email', 'phoneNumber']
      }]
    });

    return res.status(200).json({ clients: clients.map(({ dataValues }) => dataValues), message: 'Clientes encontrados!' });
  } catch (err) {
    console.error(err);
    return next(err);
  }
}

module.exports = getClients;
