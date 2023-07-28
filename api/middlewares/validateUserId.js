function validateUserId(req, res, next) {
  try {
    const { params: { userId } } = req;

    const idNum = Number(userId);

    if (!Number.isInteger(idNum)) {
      return res.status(400).json({ message: 'Id de usuário deve ser um número inteiro.' })
    }

    next();

  } catch(err) {
    return next(err);
  }
}

module.exports = validateUserId;
