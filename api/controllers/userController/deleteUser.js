const { User } = require('../../../database/models');
const deleteEntity = require('../../services/deleteEntity');

async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    const { user: { id: userId, companyId: clientId } } = req;

    await deleteEntity(User, { id }, { userId, clientId }, 'Users');

    return res.status(204).json({ message: 'Usuário deletado com sucesso!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = deleteUser;
