const express = require('express');
const login = require('../controllers/userController/login');
const postUser = require('../controllers/userController/postUser');
const checkUserByEmail = require('../middlewares/checkUserEmail');
const validateLoginInfo = require('../middlewares/validateLoginInfo');
const validateUserInfo = require('../middlewares/validateUserInfo');
const updateUser = require('../controllers/userController/updateUser');
const deleteUser = require('../controllers/userController/deleteUser');
const validateToken = require('../middlewares/validateToken');
const resetPassword = require('../controllers/userController/resetPassword');
const getFollowed = require('../controllers/userController/getFollowed');
const getFollowers = require('../controllers/userController/getFollowers');

const router = express.Router();

router.put('/', validateToken, updateUser);

router.put('/password', validateToken, resetPassword);

router.delete('/', validateToken, deleteUser);

router.get('/followed', validateToken, getFollowed);

router.get('/followers', validateToken, getFollowers);

router.post('/', validateUserInfo, checkUserByEmail, postUser);

router.post('/login', validateLoginInfo, login);

module.exports = router;
