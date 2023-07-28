const bcrypt = require('bcrypt');
const { User } = require('../../../database/models');

async function resetPassword(req, res, next) {
  try {
    const {
      user:
      { email, password: storedPassword },
      body:
      { currentPassword: informedPassword, newPassword }
    } = req;

    let correctPassword;

    correctPassword = await bcrypt.compare(informedPassword, storedPassword);

    if (!correctPassword) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, function (_err, salt) {
      bcrypt.hash(newPassword, salt, async function (_err, hash) {

        await User.update({
          password: hash
        }, {
          where: {
            email
          }
        });

        return res.status(200).json({ message: 'Senha alterada com sucesso!' });
      });
    });

  } catch (err) {
    return next(err);
  }
}

module.exports = resetPassword;
