const fs = require('fs');
const { WhistleBlow } = require('../../../database/models');
const { WhistleBlowUpdate } = require('../../../database/models');
const { WhistleBlowInvolved } = require('../../../database/models');
const decryptWhistleBlowInfo = require('../../services/decryptWbInfo');
const parseValues = require('../../../utils/parseValues');
const { Role } = require('../../../database/models');

async function getWbByClientId(req, res, next) {
  try {
    const { params: { companyId: companyIdStr } } = req;

    const companyId = Number(companyIdStr);

    const whistleBlows = await WhistleBlow.findAll({
      where: {
        companyId
      },
      attributes: { exclude: 'key' },
      include: [{
        model: WhistleBlowUpdate,
        as: 'whistleBlowUpdates',
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: WhistleBlowInvolved,
            as: 'involved'
          },
          {
            model: Role,
            as: 'area',
            attributes: ['name']
          }
        ]
      }]
    });

    if (!whistleBlows[0]) {
      return res.status(404).json({ message: 'Denúncias não encontradas.' });
    }

    whistleBlows.forEach(({ dataValues: wb }) => {
      const parsedWb = parseValues(wb);

      if (wb.whistleBlowUpdates[0]) {
        wb.involved = wb.whistleBlowUpdates.at(-1).dataValues.involved.map((wbI) => wbI.dataValues);
        const reportsDirectory = wb.whistleBlowUpdates[0].dataValues.tcReportsDirectory;

        wb.reports = {
          reportsDirectory: reportsDirectory ? reportsDirectory : '',
          actual: reportsDirectory ? fs.readdirSync(reportsDirectory) : []
        };

        delete wb.whistleBlowUpdates[0].dataValues.tcReportsDirectory;
      } else {
        wb.involved = [];
        wb.reports = {
          reportsDirectory: '',
          actual: []
        };
      }

      wb.documents = {
        documentsDirectory: wb.documentsDirectory,
        actual: parsedWb.documentsDirectory ? fs.readdirSync(wb.documentsDirectory) : []
      };

      delete wb.documentsDirectory;
    });

    const decrypted = whistleBlows.map(({ dataValues }) => decryptWhistleBlowInfo(dataValues));

    return res.status(200).json({ whistleBlows: decrypted, message: 'Denúncias encontradas!' });

  } catch (err) {
    console.log(err)

    return next(err);
  }
}

module.exports = getWbByClientId;
