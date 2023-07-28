const express = require('express');
const postWb = require('../controllers/wbController/postWb');
const encryptDirectorysFiles = require('../middlewares/encryptDirectorysFiles');
const encryptWhistleBlowInfo = require('../middlewares/encryptWhistleBlowInfo');
const receiveFiles = require('../middlewares/receiveFiles');
const validateWhistleBlow = require('../middlewares/validateWhistleBlow');
const downloadFiles = require('../controllers/wbController/downloadFiles');
const getWb = require('../controllers/wbController/getWb');
const validateToken = require('../middlewares/validateToken');
const checkInCharge = require('../middlewares/checkInCharge');
const getWbByClientId = require('../controllers/wbController/getWbByClientId');
const updateWb = require('../controllers/wbController/updateWb');
const updateWbWhistleblower = require('../controllers/wbController/updateWbByWhistleblower');
const isWhistleblower = require('../middlewares/isWhistleblower');

const router = express.Router();

router.post('/',
  receiveFiles,
  validateWhistleBlow,
  encryptWhistleBlowInfo,
  isWhistleblower,
  encryptDirectorysFiles,
  postWb
);

router.put('/whistleblower/:token',
  receiveFiles,
  isWhistleblower,
  encryptDirectorysFiles,
  updateWbWhistleblower
  );
  
  router.put('/:wbId',
  receiveFiles,
  encryptDirectorysFiles,
  updateWb
);


router.get('/company/:companyId', validateToken, checkInCharge, getWbByClientId);

router.get('/download', validateToken, downloadFiles);

router.get('/:token', getWb);

module.exports = router;
