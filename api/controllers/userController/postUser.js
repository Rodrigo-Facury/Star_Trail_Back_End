const { User } = require('../../../database/models');
const { Role } = require('../../../database/models');
const bcrypt = require('bcrypt');

async function postUser(req, res, next) {
  try {
    const {password, companyId, ...user} = req.body;
    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, function(_err, salt) {
      bcrypt.hash(password, salt, async function(_err, hash) {
        const protectedUser = {
          password: hash,
          status: 'Ativo',
          clientUser: Number(companyId) !== 1,
          companyId: Number(companyId),
          ...user
        };

        const createdUser = await User.create(protectedUser);
        const rolesToAdd = await Role.findAll({
          where: {
            id: user.roles
          }
        });

        await createdUser.setRoles(rolesToAdd);
    
        return res.status(201).json({ message: 'Usuário criado com sucesso.' });
      });
    });
    
  } catch (err) {
    next(err);
  }
};

module.exports = postUser;
