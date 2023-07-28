const multer = require('multer');

// Configuração do Multer
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, ''); // diretório será criado posteriormente
  },
  filename: function (_req, file, cb) {
    cb(null, `${Date.now() + Math.floor(Math.random() * 10000).toString()}.${file.mimetype.split('/')[1]}`); // nome do arquivo salvo
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
}).fields([
  { name: 'documents', maxCount: 10 },
  { name: 'reports', maxCount: 10 }
]);

function receiveFiles(req, _res, next) {
  try {
    upload(req, _res, err => {
      if (err) {
        return next(err);
      }

      return next();
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = receiveFiles;
