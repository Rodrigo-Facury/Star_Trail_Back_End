function validateUserInfo(req, res, next) {
  try {
    const { body: {
      name,
      email,
      password,
      phoneNumber,
      type,
      companyId
    } } = req;

    console.log(req.body);

    if (!name) {
      return res.status(400).json({ message: '"Nome" é um campo obrigatório.' });
    }

    if (!email) {
      return res.status(400).json({ message: '"Email" é um campo obrigatório.' });
    }

    if (!password) {
      return res.status(400).json({ message: '"Senha" é um campo obrigatório.' });
    }

    if (!phoneNumber) {
      return res.status(400).json({ message: '"Telefone" é um campo obrigatório.' });
    }

    if (!type) {
      return res.status(400).json({ message: '"Tipo" é um campo obrigatório.' });
    }

    if (!companyId) {
      return res.status(400).json({ message: 'Id da empresa é um campo obrigatório.' });
    }

    const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validatePhoneNumber = /\(\d{2}\)\s?(\d\s)?\d{4}-\d{4}/;


    function validatePassword(password) {
      if (password.length < 8 || password === password.toLowerCase()) {
        return false;
      }

      return true;
    }

    const validEmail = validateEmail.test(email);
    const validPassword = validatePassword(password);
    const validPhoneNumber = validatePhoneNumber.test(phoneNumber);
    const validType = type === 'r' || type === 'rw';
    const validCompanyId = Number.isInteger(Number(companyId)) && companyId > 0;

    if (!validEmail || !validPassword || !validPhoneNumber || !validCompanyId || !validType) {
      return res.status(400).json({ message: 'Dados em formato incorreto.' });
    }

    next();

  } catch (err) {
    return next(err);
  }
}

module.exports = validateUserInfo;
