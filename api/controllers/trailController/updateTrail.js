const { Company } = require('../../../database/models');
const { UserClient } = require('../../../database/models');
const { User } = require('../../../database/models');

async function updateClients(req, res, next) {
  try {
    const company = req.body;
    const { id } = req.params;

    await Company.update({
      ...company,
      ...(
        company.economicActivityCodes
        &&
        {
          economicActivityCodes: typeof company.economicActivityCodes === 'object'
            ?
            JSON.stringify(company.economicActivityCodes)
            :
            company.economicActivityCodes
        }
      )
    },
      {
        where: {
          id
        }
      });

    if (company.usersInCharge) {
      const client = await Company.findOne({
        where: {
          id
        },
        include: [{
          model: User,
          as: 'users',
          through: { attributes: [] },
          attributes: ['id']
        }]
      });

      const currentUsers = client.users;

      currentUsers.forEach(async ({ id: userId }) => {
        if (!company.usersInCharge.some((id) => id === userId)) {
          await UserClient.destroy({
            where: {
              userId
            }
          })
        }
      })

      company.usersInCharge.forEach(async (userId) => {
        if (!currentUsers.some(({ id }) => id === userId)) {
          await UserClient.create({
            clientId: id,
            userId
          })
        }
      })
    }

    return res.status(201).json({ message: 'Empresa registrada com sucesso.' });
  } catch (err) {
    next(err);
  }
};

module.exports = updateClients;
