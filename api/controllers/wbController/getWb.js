const bcrypt = require('bcrypt');
const { WhistleBlow } = require('../../../database/models');
const { WhistleBlowUpdate } = require('../../../database/models');
const decryptWhistleBlowInfo = require('../../services/decryptWbInfo');

async function getWb(req, res, next) {
  try {
    const { params: { token } } = req;

    const [key, id] = token.split(':');

    const whistleBlow = await WhistleBlow.findOne({
      where: {
        id
      },
      include: [{
        model: WhistleBlowUpdate,
        as: 'whistleBlowUpdates',
        attributes: ['udstatus', 'createdAt'],
        where: {
          private: false
        },
        required: false
      }]
    });

    if (!whistleBlow) {
      return res.status(404).json({ message: 'Denúncia não encontrada.' });
    }

    const correctKey = await bcrypt.compare(key, whistleBlow.key);

    if (!correctKey) {
      return res.status(401).json({ message: 'Token inválido.' });
    }

    delete whistleBlow.dataValues.key;

    const decrypted = decryptWhistleBlowInfo(whistleBlow.dataValues);

    return res.status(200).json({ whistleBlow: decrypted, message: 'Denúncia encontrada!' });

  } catch (err) {
    return next(err);
  }
}

module.exports = getWb;
