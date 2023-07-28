const { Company } = require('../../../database/models');
const { UserClient } = require('../../../database/models');

async function postCompany(req, res, next) {
  try {
    const company = req.body;

    const createdCompany = await Company.create({
      ...company,
      ...(
        company.economicActivityCodes
        &&
        {
          economicActivityCodes: JSON.stringify(company.economicActivityCodes)
        }
      ),
      status: 'client'
    });

    if (company.usersInCharge) {
      company.usersInCharge.forEach(async (user) => {
        await UserClient.create({
          userId: user,
          clientId: createdCompany.id
        });
      });
    }

    return res.status(201).json({ message: 'Empresa registrada com sucesso.' });
  } catch (err) {
    next(err);
  }
};

module.exports = postCompany;
