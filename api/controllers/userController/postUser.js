const { User } = require('../../../database/models');
const bcrypt = require('bcrypt');
const createToken = require('../../services/createToken');

async function postUser(req, res, next) {
  try {
    const {password, ...user} = req.body;
    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, function(_err, salt) {
      bcrypt.hash(password, salt, async function(_err, hash) {
        const protectedUser = {
          password: hash,
          ...user
        };

        const createdUser = await User.create(protectedUser);

        delete createdUser.password;

        const token = createToken(createdUser.dataValues);
    
        return res.status(201).json({ message: 'Usuário criado com sucesso.', token });
      });
    });
    
  } catch (err) {
    next(err);
  }
};

module.exports = postUser;
