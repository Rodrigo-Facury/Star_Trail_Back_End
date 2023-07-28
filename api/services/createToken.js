const jwt = require('jsonwebtoken');
const { SECRET } = process.env;

function createToken(payload) {
    const jwtConfig = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };

    const token = jwt.sign(payload, SECRET, jwtConfig);

    return token;
};

module.exports = createToken;
