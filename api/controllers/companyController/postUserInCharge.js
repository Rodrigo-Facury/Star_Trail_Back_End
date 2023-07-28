const { UserClient } = require('../../../database/models');

async function postUserInCharge(req, res, next) {
  try {
    let { clientId, userId } = req.query;

    clientId = Number(clientId);
    userId = Number(userId);

    await UserClient.create({
      userId,
      clientId
    });

    return res.status(201).json({ message: 'Usuário adicionado com sucesso.' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = postUserInCharge;
