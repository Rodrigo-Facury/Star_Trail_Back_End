const fs = require('fs');
const path = require('path');
const { encryptFile } = require('../../utils/cryptographyFile');
const generateKey = require('../../utils/generateKey');

const encryptDirectorysFiles = (req, res, next) => {
  let documentsDirectory;

  if (req.body.documentsDirectory) {
    documentsDirectory = req.body.documentsDirectory;
  } else {
    documentsDirectory = path.join('uploads', generateKey());
  }

  let reportsDirectory;

  if (req.body.reportsDirectory) {
    reportsDirectory = req.body.reportsDirectory;
  } else {
    reportsDirectory = path.join('uploads', generateKey());
  }

  try {
    if (req.files.documents && Object.keys(req.files.documents).length > 0) {
      const { documents } = req.files;
      for (const document of documents) {
        const filePath = path.resolve(document.destination, document.filename);

        encryptFile(filePath);
      }

      fs.mkdirSync(documentsDirectory, { recursive: true });

      documents.forEach(document => {
        const oldPath = path.join(document.destination, document.filename + '.enc');

        let newPath;

        if (req.isWhistleblower) {
          newPath = path.join(documentsDirectory, 'wbr-' + document.filename + '.enc');
        } else {
          newPath = path.join(documentsDirectory, document.filename + '.enc');
        }

        fs.renameSync(oldPath, newPath);
      });

      req.documentsDirectory = documentsDirectory;
    }

    if (req.files.reports && Object.keys(req.files.reports).length > 0) {
      const reports = req.files.reports;
      for (const report of reports) {
        const filePath = path.resolve(report.destination, report.filename);

        encryptFile(filePath);
      }

      fs.mkdirSync(reportsDirectory, { recursive: true });

      reports.forEach(report => {
        const oldPath = path.join(report.destination, report.filename + '.enc');
        const newPath = path.join(reportsDirectory, report.filename + '.enc');

        fs.renameSync(oldPath, newPath);
      });

      req.reportsDirectory = reportsDirectory;
    }

    return next();
  } catch (error) {
    console.error('Erro ao criptografar documentos:', error);
    return res.status(500).json({ error: 'Erro ao criptografar documentos' });
  }
};

module.exports = encryptDirectorysFiles;
