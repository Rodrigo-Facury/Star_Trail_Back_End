const express = require('express');
const validateToken = require('../middlewares/validateToken');
const getTrailsFeed = require('../controllers/trailController/getTrailsFeed');
const deleteTrail = require('../controllers/trailController/deleteTrail');
const updateTrail = require('../controllers/trailController/updateTrail');
const postTrail = require('../controllers/trailController/postTrail');
const getStarredTrails = require('../controllers/trailController/getStarredTrails');
const getTrailsByUser = require('../controllers/trailController/getUsersTrails');
const getTrailsByTopic = require('../controllers/trailController/getTrailsByTopic');
const starTrail = require('../controllers/trailController/starTrail');

const router = express.Router();

router.delete('/:trailId', validateToken, deleteTrail);

router.get('/starred', getStarredTrails);

router.get('/topic/:topicId', getTrailsByTopic);

router.get('/', getTrailsFeed);

router.get('/user/:userId', getTrailsByUser);

router.post('/', validateToken, postTrail);

router.post('/star/:trailId', validateToken, starTrail);

router.put('/:trailId', validateToken, updateTrail);

module.exports = router;
