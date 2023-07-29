const express = require('express');
const userRoutes = require('./api/routes/userRoutes');
const trailRoutes = require('./api/routes/trailRoutes');
const topicRoutes = require('./api/routes/topicRoutes');
const errorHandler = require('./api/middlewares/errorHandler');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/user', userRoutes);

app.use('/trail', trailRoutes);

app.use('/topic', topicRoutes);

app.use(errorHandler);

module.exports = app;
