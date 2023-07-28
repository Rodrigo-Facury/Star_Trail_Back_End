const crypto = require('crypto');

function generateKey() {
  const keyLength = 256; // Tamanho em bits da chave
  const buffer = crypto.randomBytes(keyLength / 8); // Gera um buffer aleatório com o tamanho da chave em bytes
  return buffer.toString('hex'); // Converte o buffer para uma string hexadecimal
}

module.exports = generateKey;
