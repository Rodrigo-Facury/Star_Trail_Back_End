const express = require('express');
const crypto = require('crypto');
const userRoutes = require('./api/routes/userRoutes');
const trailRoutes = require('./api/routes/trailRoutes');
const topicRoutes = require('./api/routes/topicRoutes');
const errorHandler = require('./api/middlewares/errorHandler');
const { User } = require('./database/models')
const cors = require('cors');
const path = require('path');
const mailer = require('./helpers/mailer');
const validateToken = require('./api/middlewares/validateToken');
const createToken = require('./api/services/createToken');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/public/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

app.use('/user', userRoutes);

app.use('/trail', trailRoutes);

app.use('/topic', topicRoutes);

app.get('/validate', async (req, res) => {
  const token = req.query.token;

  const foundUser = await User.findOne({ where: { validationToken: token } });

  if (foundUser) {
    if (foundUser.validated) {
      return res.redirect(`${process.env.APP_BASE_URL}already-validated`);
    } else {
      foundUser.update({ validated: true });

      return res.redirect(`${process.env.APP_BASE_URL}validation-success`);
    }
  } else {
    return res.redirect(`${process.env.APP_BASE_URL}validation-error`);
  }
});

app.get('/resend-validation-email/:email', async (req, res) => {
  const { email } = req.params;

  const foundUser = await User.findOne({ where: { email } });

  if (!foundUser) {
    return res.status(404).json({ message: 'Endereço de e-mail não encontrado' });

  } else {
    const validationToken = crypto.randomBytes(32).toString('hex');

    foundUser.update({ validationToken });

    const validationUrl = `${process.env.API_BASE_URL}validate?token=${validationToken}`;

    const mailOptions = {
      from: 'rodrigo@startrail.com.br',
      to: email,
      subject: 'Confirmação de Email',
      text: `Por favor, clique no link a seguir para validar seu email: ${validationUrl}`,
      html: `<p>Por favor, <a href="${validationUrl}">clique aqui</a> para validar seu email.</p>`
    };

    mailer.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Erro ao enviar o email de validação:', error);
        return res.status(500).json({ message: 'Erro ao enviar o email de validação' });

      } else {
        console.log('Email de validação enviado:', info.response);
      }
    });

    return res.status(200).json({ message: 'E-mail reenviado com sucesso' });
  }
});

app.get('/check-validation', validateToken, async (req, res) => {
  const { user } = req;

  if (user.validated) {
    delete user.password;

    const newToken = createToken(user);

    return res.status(200).json({ message: 'E-mail validado com sucesso', token: newToken });
  }

  return res.status(401).json({ message: 'E-mail não validado' });
});

app.use(errorHandler);

module.exports = app;
