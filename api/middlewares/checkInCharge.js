const { User } = require('../../database/models');
const { Role } = require('../../database/models');
const { Company } = require('../../database/models');

async function checkInCharge(req, res, next) {
  const { user: { id }, params: { companyId } } = req;

  try {
    const user = await User.findOne({
      where: {
        id
      },
      include: [{
        model: Role,
        as: 'roles',
        through: { attributes: [] },
        attributes: ['name']
      }]
    });

    const masterOrIT = user.roles.some((role) => role.dataValues.name === 'Master' || role.dataValues.name === 'IT');

    if (masterOrIT) {
      return next();
    }

    const userInCharge = await User.findOne({
      where: {
        id
      },
      include: [{
        model: Company,
        as: 'clients',
        through: { attributes: [] },
        attributes: ['id']
      }]
    });

    const isOfficer = user.roles.some(({ dataValues: { name } }) => name === 'Compliance Officer');

    const isInCharge = userInCharge.clients.some(({ id }) => id === companyId);

    if (isInCharge && isOfficer) {
      return next();
    }

    return res.status(401).json({ message: 'Usuário não autorizado.' });

  } catch (err) {
    return next(err);
  }
};

module.exports = checkInCharge;
