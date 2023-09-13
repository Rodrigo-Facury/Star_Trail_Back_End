const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');

const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = {
  upload,
  processAndSaveImage: async (req, res, next) => {
    if (!req.file) {
      return next();
    }

    try {
      const resizedImageBuffer = await sharp(req.file.buffer)
        .resize({ width: 150 })
        .toBuffer();

      const filePath = 'public/uploads/' + Date.now() + '-' + req.file.originalname;

      fs.writeFileSync(filePath, resizedImageBuffer);

      req.file.path = filePath;

      next();
    } catch (err) {
      next(err);
    }
  },
};
