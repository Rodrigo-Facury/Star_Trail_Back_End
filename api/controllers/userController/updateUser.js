const { User } = require('../../../database/models');

async function updateUser(req, res, next) {
  const userId = req.user.id;
  const { firstName, lastName, userName, aboutMe } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    if (req.file && req.file.path) {
      await user.update({ firstName, lastName, userName, aboutMe, profilePicturePath: req.file.path });
    } else {
      await user.update({ firstName, lastName, userName, aboutMe });
    }

    return res.status(200).json({ user, message: 'Usuário atualizado com sucesso!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = updateUser;
