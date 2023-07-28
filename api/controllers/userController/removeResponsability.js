const { UserClient } = require('../../../database/models');

async function removeResponsability(req, res, next) {
  try {
    let { userId, companyId: clientId } = req.query;
    
    userId = Number(userId);
    clientId = Number(clientId);

    await UserClient.destroy(
      {
        where: {
          userId,
          clientId
        }
      });

    return res.status(204).json({ message: 'Responsabilidade removida com sucesso!' });
  } catch (err) {
    console.error(err);
    return next(err);
  }
}

module.exports = removeResponsability;
