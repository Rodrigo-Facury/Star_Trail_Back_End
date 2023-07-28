const fs = require('fs');
const path = require('path');
const { decryptFile } = require('../../../utils/cryptographyFile');

async function downloadFiles(req, res, next) {
  try {
    const { query: { fd, f }, tokenInfo: { roles } } = req;
    const acceptedRoles = ['Master', 'IT', 'Compliance Officer'];
    
    if (!roles.some((role) => acceptedRoles.includes(role))) {
      return res.status(401).json({ message: 'Usuário não autorizado.' });
    }

    const filepath = path.resolve(fd, f).slice(0, -4);
    decryptFile(filepath);
    return res.status(200).download(filepath, function (err) {
      if (err) {
        return next(err);
      } else {
        fs.unlinkSync(filepath)
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = downloadFiles;
