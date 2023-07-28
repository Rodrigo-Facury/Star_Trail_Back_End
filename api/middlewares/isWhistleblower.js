function isWhistleblower(req, _res, next) {
  try {
    req.isWhistleblower = true;

    next();
  } catch(err) {
    return next(err);
  }
}

module.exports = isWhistleblower;
