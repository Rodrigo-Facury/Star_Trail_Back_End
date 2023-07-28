const deleteEntity = async (model, finders) => {
  try {
    const foundEntity = await model.findOne({
      where: {
        ...finders
      }
    });

    if (!foundEntity) {
      throw new Error({ message: 'Entidade não encontrada', status: 404 });
    }

    await foundEntity.destroy();

  } catch (err) {
    throw new Error(err);
  }

};

module.exports = deleteEntity;
