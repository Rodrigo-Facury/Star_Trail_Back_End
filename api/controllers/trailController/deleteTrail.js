const { Company } = require('../../../database/models');
const deleteEntity = require('../../services/deleteEntity');

async function deleteCompany(req, res, next) {
  try {
    const { id } = req.params;
    const { user: { id: userId, companyId: clientId } } = req;

    await deleteEntity(Company, { id }, { userId, clientId }, 'Companies');

    return res.status(204).json({ message: 'Cliente deletado com sucesso!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = deleteCompany;
