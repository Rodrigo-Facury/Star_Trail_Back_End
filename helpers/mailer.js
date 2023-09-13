const nodemailer = require('nodemailer');
require('dotenv').config();

const mailer = nodemailer.createTransport({
  host: 'smtpout.secureserver.net',
  port: 465,
  auth: {
    user: 'rodrigo@startrail.com.br',
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports = mailer
