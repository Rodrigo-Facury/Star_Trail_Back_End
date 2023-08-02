const { User } = require('../../../database/models');
const fs = require('fs');
const path = require('path');

async function updateUser(req, res, next) {
  const userId = req.user.id;
  const { firstName, lastName, username, aboutMe } = req.body;

  try {
    if (username) {
      const existingUser = await User.findOne({
        where: { username },
      });

      if (existingUser && existingUser.id !== userId) {
        return res.status(400).json({ message: 'O novo username já está em uso. Escolha outro.' });
      }
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    if (req.file && req.file.path) {
      if (user.profilePicturePath) {
        const previousProfilePicturePath = path.resolve(user.profilePicturePath);

        fs.unlink(previousProfilePicturePath, (err) => {
          if (err) {
            console.error('Erro ao excluir a foto anterior:', err);
          }
        });
      }

      await user.update({ firstName, lastName, username, aboutMe, profilePicturePath: req.file.path });
    } else {
      await user.update({ firstName, lastName, username, aboutMe });
    }

    delete user.dataValues.password;

    return res.status(200).json({ user, message: 'Usuário atualizado com sucesso!' });
  } catch (err) {
    return next(err);
  }
}

module.exports = updateUser;
