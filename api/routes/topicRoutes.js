const express = require('express');
const getAllTopics = require('../controllers/topicController/getAllTopics');

const router = express.Router();

router.get('/', getAllTopics);

module.exports = router;
