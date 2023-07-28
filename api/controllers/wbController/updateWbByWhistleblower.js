const { WhistleBlow } = require('../../../database/models');
const { WhistleBlowUpdate } = require('../../../database/models');
const { WhistleBlowInvolved } = require('../../../database/models');
const fs = require('fs-extra');
const path = require('path');
const parseValues = require('../../../utils/parseValues');
const bcrypt = require('bcrypt');
const { encrypt } = require('../../../utils/cryptography');

async function updateWbWhistleblower(req, res, next) {
  try {
    const parsedBody = parseValues(req.body);
    const { params: { token } } = req;
    const [key, id] = token.split(':');

    // console.log(key, id);

    const foundWb = await WhistleBlow.findOne({
      where: {
        id
      },
      include: [{
        model: WhistleBlowUpdate,
        as: 'whistleBlowUpdates',
        order: [['createdAt', 'DESC']],
        include: [{
          model: WhistleBlowInvolved,
          as: 'involved'
        }]
      }]
    });

    // console.log(foundWb);


    if (!foundWb) {
      return res.status(404).json({ message: 'Denúncia não encontrada.' });
    }

    const correctKey = await bcrypt.compare(key, foundWb.key);

    if (!correctKey) {
      return res.status(401).json({ message: 'Token inválido.' });
    }

    await WhistleBlow.update(
      {
        text: encrypt(parsedBody.textIncrement),
        ...(req.documentsDirectory && { documentsDirectory: req.documentsDirectory })
      },
      {
        where: { id }
      }
    );

    const lastUpdate = foundWb.dataValues.whistleBlowUpdates[0].dataValues;

    delete lastUpdate.id;
    delete lastUpdate.createdAt;
    delete lastUpdate.updatedAt;

    await WhistleBlowUpdate.create({
      ...lastUpdate,
      udstatus: 'Em análise',
      private: false
    })

    console.log('ok');

    return res.status(200).json({
      message: 'Denúncia atualizada com sucesso!'
    });

  } catch (error) {
    fs.removeSync(path.resolve(req.documentsDirectory));

    next(error);
  }
}

module.exports = updateWbWhistleblower
