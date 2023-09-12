const { User, Notification } = require('../../../database/models');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const createToken = require('../../services/createToken');
const getRandomImage = require('../../../helpers/getRandomImage.helper');
const mailer = require('../../../helpers/mailer');

async function postUser(req, res, next) {
  try {
    const { password, ...user } = req.body;
    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, function (_err, salt) {
      bcrypt.hash(password, salt, async function (_err, hash) {
        const profilePicturePath = await getRandomImage();
        const validationToken = crypto.randomBytes(32).toString('hex');

        const protectedUser = {
          password: hash,
          profilePicturePath,
          validationToken,
          ...user
        };

        const createdUser = await User.create(protectedUser);

        delete createdUser.password;

        await Notification.create({
          message: 'Boas-vindas à Star Trail! Sinta-se em casa!',
          userId: createdUser.id
        });

        const token = createToken(createdUser.dataValues);

        const validationUrl = `${process.env.API_BASE_URL}validate?token=${validationToken}`;

        const mailOptions = {
          from: 'rodrigo@startrail.com.br',
          to: createdUser.email,
          subject: 'Confirmação de Email',
          text: `Por favor, clique no link a seguir para validar seu email: ${validationUrl}`,
          html: `<p>Por favor, <a href="${validationUrl}">clique aqui</a> para validar seu email.</p>`
        };

        mailer.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Erro ao enviar o email de validação:', error);
          } else {
            console.log('Email de validação enviado:', info.response);
          }
        });

        return res.status(201).json({ message: 'Usuário criado com sucesso.', token });
      });
    });

  } catch (err) {
    next(err);
  }
};

module.exports = postUser;
