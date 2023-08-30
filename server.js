require('dotenv').config();
const https = require('https');
const fs = require('fs');

const httpsOptions = {
  key: fs.readFileSync('/etc/ssl/live/startrail.com.br/privkey.pem'),
  cert: fs.readFileSync('/etc/ssl/live/startrail.com.br/fullchain.pem')
};

const app = require("./app");
process.env.NODE_ENV === 'prod'
  ?
  https.createServer(httpsOptions, app).listen(3443, () => {
    console.log('Servidor HTTPS rodando na porta 3443');
  })
  :
  app.listen(3001, () => console.log('ouvindo na porta 3001'));
