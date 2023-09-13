const express = require('express');
const login = require('../controllers/userController/login');
const postUser = require('../controllers/userController/postUser');
const checkUserByEmail = require('../middlewares/checkUserEmailAndUsername');
const validateLoginInfo = require('../middlewares/validateLoginInfo');
const validateUserInfo = require('../middlewares/validateUserInfo');
const updateUser = require('../controllers/userController/updateUser');
const deleteUser = require('../controllers/userController/deleteUser');
const validateToken = require('../middlewares/validateToken');
const resetPassword = require('../controllers/userController/resetPassword');
const getFollowed = require('../controllers/userController/getFollowed');
const getFollowers = require('../controllers/userController/getFollowers');
const { upload, processAndSaveImage } = require('../middlewares/receiveFiles');
const getUserById = require('../controllers/userController/getUserById');
const getUsersByUsername = require('../controllers/userController/getUsersByUsername');
const followUser = require('../controllers/userController/followUser');
const unfollowUser = require('../controllers/userController/unfollowUser');
const getUserByUsername = require('../controllers/userController/getUserByUsername');
const getUsersNotifications = require('../controllers/userController/getUsersNotifications');
const markSeenUsersNotifications = require('../controllers/userController/markSeenUsersNotifications');

const router = express.Router();

router.put('/', validateToken, upload.single('profilePicturePath'), processAndSaveImage, updateUser);

router.put('/password', validateToken, resetPassword);

router.put('/see-notification/:notificationId', validateToken, markSeenUsersNotifications);

router.get('/followers', validateToken, getFollowers);

router.get('/notifications', validateToken, getUsersNotifications);

router.get('/followed', validateToken, getFollowed);

router.delete('/', validateToken, deleteUser);

router.get('/username/:username', getUsersByUsername);

router.get('/username-exact/:username', getUserByUsername);

router.get('/:id', getUserById);

router.post('/', validateUserInfo, checkUserByEmail, postUser);

router.post('/follow/:followedUserId', validateToken, followUser);

router.post('/unfollow/:followedUserId', validateToken, unfollowUser);

router.post('/login', validateLoginInfo, login);

module.exports = router;
