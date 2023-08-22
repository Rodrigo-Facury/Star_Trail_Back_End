const jwt = require('jsonwebtoken');
const { User } = require('../../database/models');
const { SECRET } = process.env;

async function validateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Usuário não autorizado.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    const foundUser = await User.findOne({ where: { email: decoded.email } });

    if (!foundUser) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    req.user = foundUser.dataValues;
    req.tokenInfo = decoded;

    next();
  } catch (err) {
    console.log(err);

    return res.status(403).json({ message: 'Token inválido ou expirado.' });
  }
};

module.exports = validateToken;
