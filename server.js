require('dotenv').config();
const https = require('https');
const fs = require('fs');
const app = require("./app");

if (process.env.NODE_ENV === 'prod') {
  const httpsOptions = {
    key: fs.readFileSync('/etc/ssl/live/startrail.com.br/privkey.pem'),
    cert: fs.readFileSync('/etc/ssl/live/startrail.com.br/fullchain.pem')
  };

  https.createServer(httpsOptions, app).listen(3443, () => {
    console.log('Servidor HTTPS rodando na porta 3443');
  })
} else {
  app.listen(3001, () => console.log('ouvindo na porta 3001'));
}
