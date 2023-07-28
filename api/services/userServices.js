const { User } = require('../../database/models');

async function findByEmail(email) {
  try {
    const user = await User.findOne({ where: { email } });
    
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  findByEmail
};
