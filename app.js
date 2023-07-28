const express = require('express');
const userRoutes = require('./api/routes/userRoutes');
const companyRoutes = require('./api/routes/companyRoutes');
const wbRoutes = require('./api/routes/wbRoutes');
const errorHandler = require('./api/middlewares/errorHandler');
const cors = require('cors');

const app = express();

app.use(cors());

app.use('/wb', wbRoutes);

app.use(express.json());

app.use('/user', userRoutes);

app.use('/company', companyRoutes);

app.use(errorHandler);

module.exports = app;
