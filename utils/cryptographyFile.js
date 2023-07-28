const { encrypt, decrypt } = require('./cryptography');
const fs = require('fs');

function encryptFile(filePath) {
  let bitmap = fs.readFileSync(filePath);

  bitmap = new Buffer.from(bitmap).toString('base64');

  const bitmapEnc = encrypt(bitmap);

  fs.writeFileSync(filePath + '.enc', bitmapEnc);

  fs.unlinkSync(filePath);
}

function decryptFile(filePath) {
  const bitmapEnc = fs.readFileSync(`${filePath}.enc`).toString();
  
  const bitmapDec = decrypt(bitmapEnc);
  
  const fileBuffer = new Buffer.from(bitmapDec, 'base64');

  fs.writeFileSync(filePath, fileBuffer);
}

module.exports = { encryptFile, decryptFile };
