const { Role } = require('../../../database/models');
const { User } = require('../../../database/models');
const bcrypt = require('bcrypt');

async function updateUser(req, res, next) {
  try {
    const {
      password,
      companyId,
      id,
      roles,
      clientUser,
      createdAt,
      updatedAt,
      ...user
    } = req.body;

    let parsedRoles = roles;

    if (typeof roles[0] === 'object') {
      parsedRoles = roles.map(({ id }) => id);
    }

    const saltRounds = 10;

    if (password) {
      bcrypt.genSalt(saltRounds, function (_err, salt) {
        bcrypt.hash(password, salt, async function (_err, hash) {
          const protectedUser = {
            password: hash,
            ...user
          };

          await User.update(protectedUser, {
            where: {
              id
            }
          });

          const updatedUser = await User.findByPk(id);


          const rolesToSet = await Role.findAll({
            where: {
              id: parsedRoles
            }
          });

          await updatedUser.setRoles(rolesToSet);

          return res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
        });
      });
    } else {

      await User.update(user, {
        where: {
          id
        }
      });

      const updatedUser = await User.findByPk(id);

      const rolesToSet = await Role.findAll({
        where: {
          id: parsedRoles
        }
      });

      await updatedUser.setRoles(rolesToSet);

      return res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
    }

  } catch (err) {
    next(err);
  }
};

module.exports = updateUser;
