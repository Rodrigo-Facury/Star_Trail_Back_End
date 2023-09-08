const express = require('express');
const getAllTopics = require('../controllers/topicController/getAllTopics');
const getTopicsByName = require('../controllers/topicController/getTopicsByName');

const router = express.Router();

router.get('/', getAllTopics);

router.get('/:name', getTopicsByName);

module.exports = router;
