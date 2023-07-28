const { WhistleBlow } = require('../../../database/models');
const { WhistleBlowUpdate } = require('../../../database/models');
const fs = require('fs-extra');
const path = require('path');
const parseValues = require('../../../utils/parseValues');
const { WhistleBlowInvolved } = require('../../../database/models');

async function updateWb(req, res, next) {
  try {
    const parsedBody = parseValues(req.body);

    parsedBody.documentsChanges.forEach(({ file }) => {
      fs.removeSync(path.resolve(parsedBody.documentsDirectory, file));
    });

    parsedBody.reportsChanges.forEach(({ file }) => {
      fs.removeSync(path.resolve(parsedBody.reportsDirectory, file));
    });

    await WhistleBlow.update(
      {
        channel: parsedBody.channel,
        ...(req.documentsDirectory && { documentsDirectory: req.documentsDirectory })
      },
      {
        where: { id: parsedBody.id }
      }
    );

    const createData = {
      wbId: parsedBody.id,
      channel: parsedBody.channel,
      udstatus: parsedBody.status,
      areaId: parsedBody.areaId && Number(parsedBody.areaId),
      wbAction: parsedBody.wbAction,
      opinion: parsedBody.opinion,
      category: parsedBody.category,
      urgency: parsedBody.urgency,
      severity: parsedBody.severity,
      validation: parsedBody.validation,
      private: parsedBody.private
    };

    if (req.reportsDirectory) {
      createData.tcReportsDirectory = req.reportsDirectory;
    } else {
      createData.tcReportsDirectory = parsedBody.reportsDirectory;
    }

    const wbUCreated = await WhistleBlowUpdate.create(parseValues(createData));

    if (parsedBody.involved) {
      const wbUId = wbUCreated.id;

      parsedBody.involved.forEach(async (inv) => {
        if (inv && inv.id) {
          delete inv.id;
        }

        await WhistleBlowInvolved.create({
          ...inv,
          wbUId
        });
      })
    }

    return res.status(200).json({
      message: 'Denúncia atualizada com sucesso!'
    });

  } catch (error) {
    console.log(error)

    fs.removeSync(path.resolve(req.documentsDirectory));

    next(error);
  }
}

module.exports = updateWb
