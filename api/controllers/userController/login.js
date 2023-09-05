const bcrypt = require('bcrypt');
const { User } = require('../../../database/models');
const { Op } = require('sequelize')
const createToken = require('../../services/createToken');

async function login(req, res, next) {
  try {
    const { body: { emailOrUsername, password } } = req;

    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: emailOrUsername },
          { username: emailOrUsername }
        ]
      }
    });

    let correctPassword;

    if (user) {
      correctPassword = await bcrypt.compare(password, user.password);

      delete user.dataValues.password;
    }

    if (!correctPassword) {
      return res.status(401).json({ message: 'Usuário ou senha incorretos.' });
    }

    const userInfo = user.dataValues;

    const peopleIFollow = await user.getFollowing();

    console.log(peopleIFollow + 'AQUIIIII')


    const token = createToken({ ...userInfo, peopleIFollow: [...peopleIFollow]});

    return res.status(200).json({ token, message: 'Login efetuado com sucesso!' });

  } catch (err) {
    return next(err);
  }
}

module.exports = login;
