module.exports = function(err, _req, res, _next) {
  console.log(err);

  const { message, status } = err;

  return res.status(status || 500).json({ message });
}
