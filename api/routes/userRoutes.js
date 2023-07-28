const express = require('express');
const login = require('../controllers/userController/login');
const postUser = require('../controllers/userController/postUser');
const checkUserByEmail = require('../middlewares/checkUserEmail');
const validateLoginInfo = require('../middlewares/validateLoginInfo');
const validateUserInfo = require('../middlewares/validateUserInfo');
const getUsers = require('../controllers/userController/getUsers');
const getUsersByCompanyId = require('../controllers/userController/getUsersByCompanyId');
const updateUser = require('../controllers/userController/updateUser');
const deleteUser = require('../controllers/userController/deleteUser');
const removeResponsability = require('../controllers/userController/removeResponsability');
const validateToken = require('../middlewares/validateToken');
const resetPassword = require('../controllers/userController/resetPassword');

const router = express.Router();

router.post('/', validateUserInfo, checkUserByEmail, postUser);

router.put('/', updateUser);

router.put('/password', validateToken, resetPassword);

router.delete('/responsability', removeResponsability);

router.delete('/:id', validateToken, deleteUser);

router.get('/', getUsers);

router.get('/:companyId', getUsersByCompanyId);

router.post('/login', validateLoginInfo, login);

module.exports = router;
