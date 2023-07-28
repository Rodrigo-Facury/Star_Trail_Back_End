const bcrypt = require('bcrypt');
const { User } = require('../../../database/models');
const { Role } = require('../../../database/models');
const { WebsiteModule } = require('../../../database/models');
const createToken = require('../../services/createToken');

async function login(req, res, next) {
  try {
    const { body: { email, password } } = req;

    const user = await User.findOne({
      where: {
        email
      },
      include: [{
        model: Role,
        as: 'roles',
        through: { attributes: [] },
        attributes: ['name'],
        include: [{
          model: WebsiteModule,
          as: 'modules',
          through: { attributes: [] },
          attributes: ['name']
        }]
      }]
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

    const roles = new Array();

    const modules = new Set();

    userInfo.roles.forEach(({ modules: roleModules, name }) => {
      roles.push(name);
      roleModules.forEach((module) => {
        modules.add(module.name);
      });
    });

    userInfo.roles = roles;

    userInfo.permissions = [...modules.values()];

    const token = createToken(userInfo);

    return res.status(200).json({ token, message: 'Login efetuado com sucesso!' });

  } catch (err) {
    return next(err);
  }
}

module.exports = login;
