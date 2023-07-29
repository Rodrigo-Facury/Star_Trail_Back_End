const { RegExHelper } = require("../../helpers/regex.helper");

function validateLoginInfo(req, res, next) {
  try {
    const { body: { emailOrUsername, password } } = req;

    if (!emailOrUsername) {
      return res.status(400).json({ message: '"Email ou username" é um campo obrigatório.' });
    }

    if (!password) {
      return res.status(400).json({ message: '"Senha" é um campo obrigatório.' });
    }

    const validEmailOrUsername = RegExHelper.email.test(emailOrUsername) || RegExHelper.username.test(emailOrUsername);
    const validPassword = RegExHelper.password.test(password);

    if (!validEmailOrUsername || !validPassword) {
      return res.status(400).json({ message: 'Email ou Senha em formato incorreto.' });
    }

    next();

  } catch(err) {
    return next(err);
  }
}

module.exports = validateLoginInfo;
