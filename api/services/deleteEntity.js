const { Log } = require("../../database/models");
const { encrypt } = require("../../utils/cryptography");

const deleteEntity = async (model, finders, identifiers, table) => {
  try {
    const foundEntity = await model.findOne({
      where: {
        ...finders
      }
    });

    if (!foundEntity) {
      throw new Error({ message: 'Entidade não encontrada', status: 404 });
    }

    const encryptedEntity = encrypt(JSON.stringify(foundEntity.dataValues));

    const details = JSON.stringify({ deleted: encryptedEntity });

    await Log.create({
      ...identifiers,
      details,
      action: 'delete',
      table
    });

    await foundEntity.destroy();

  } catch (err) {
    throw new Error(err);
  }

};

module.exports = deleteEntity;
