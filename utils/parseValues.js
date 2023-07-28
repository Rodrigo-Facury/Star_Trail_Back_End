module.exports = function parseValues(obj) {
  const result = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      let value = obj[key];

      try {
        value = JSON.parse(value);
      } catch (error) {
      }

      result[key] = value;
    }
  }

  return result;
}
