const { RegExHelper } = require("../../helpers/regex.helper");

function validateUserInfo(req, res, next) {
  try {
    const { body: {
      firstName,
      lastName,
      username,
      email,
      password,
    } } = req;

    console.log(req.body);

    if (!firstName) {
      return res.status(400).json({ message: '"Nome" é um campo obrigatório.' });
    }

    if (!lastName) {
      return res.status(400).json({ message: '"Sobrenome" é um campo obrigatório.' });
    }

    if (!username) {
      return res.status(400).json({ message: '"Username" é um campo obrigatório.' });
    }

    if (!email) {
      return res.status(400).json({ message: '"E-mail" é um campo obrigatório.' });
    }

    if (!password) {
      return res.status(400).json({ message: '"Senha" é um campo obrigatório.' });
    }

    const validEmail = RegExHelper.email.test(email);
    const validPassword = RegExHelper.password.test(password);
    const validFirstName = RegExHelper.name.test(firstName);
    const validLastName = RegExHelper.name.test(lastName);
    const validUsername = RegExHelper.username.test(username);

    if (!validEmail || !validPassword || !validFirstName || !validLastName || !validUsername) {
      return res.status(400).json({ message: 'Dados em formato incorreto.' });
    }

    next();

  } catch (err) {
    return next(err);
  }
}

module.exports = validateUserInfo;
