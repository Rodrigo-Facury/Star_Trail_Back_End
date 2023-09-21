async function authenticateUserWithToken(token) {
  const decoded = jwt.verify(token, SECRET);
  const foundUser = await User.findOne({ where: { email: decoded.email } });

  return foundUser;
}

module.exports = authenticateUserWithToken;
