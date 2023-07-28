const express = require('express');
const getCompanyRoles = require('../controllers/companyController/getCompanyRoles');
const getClients = require('../controllers/companyController/getClients');
const postCompany = require('../controllers/companyController/postCompany');
const getUsersInCharge = require('../controllers/companyController/getUsersInCharge');
const postUserInCharge = require('../controllers/companyController/postUserInCharge');
const updateClients = require('../controllers/companyController/updateClients');
const deleteCompany = require('../controllers/companyController/deleteCompany');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', postCompany);

router.put('/:id', updateClients);

router.post('/userInCharge', postUserInCharge);

router.get('/', getClients);

router.delete('/:id', validateToken, deleteCompany);

router.get('/usersInCharge/:companyId', getUsersInCharge);

router.get('/roles/:companyId', getCompanyRoles);

module.exports = router;
