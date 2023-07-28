const bcrypt = require('bcrypt');
const generateKey = require('../../../utils/generateKey');
const { WhistleBlow } = require('../../../database/models');
const fs = require('fs-extra');
const path = require('path');

async function postWb(req, res, next) {
  try {
    const { documentsDirectory } = req;

    // recupera a originalKey gerada
    const originalKey = generateKey();

    // cria um hash da chave original utilizando bcrypt
    const hashedKey = await bcrypt.hash(originalKey, 10);

    
    // incorpora a chave hasheada ao objeto recebido no body
    const savedWhistleBlow = await WhistleBlow.create({
      ...req.body,
      key: hashedKey,
      documentsDirectory,
      status: 'Recebida'
    });
    
    // retorna a mensagem de sucesso e o token
    return res.status(201).json({
      message: 'Denúncia registrada com sucesso!',
      token: originalKey + ':' + savedWhistleBlow.id.toString()
    });
  } catch (error) {
    fs.removeSync(path.resolve(req.documentsDirectory));

    next(error);
  }
}

module.exports = postWb
