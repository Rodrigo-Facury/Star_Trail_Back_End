const { User } = require('../../../database/models');

async function updateUser(req, res, next) {
  try {
    const userChanges = req.body;
    const { id } = req.user;

    await User.update(userChanges, {
      where: {
        id
      }
    });

    return res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
  } catch (err) {
    next(err);
  }
};

module.exports = updateUser;
