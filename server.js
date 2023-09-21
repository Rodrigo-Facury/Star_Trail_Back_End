require('dotenv').config();
const https = require('https');
const fs = require('fs');
const app = require('./app');
const socketIo = require('socket.io');

let server;

if (process.env.NODE_ENV === 'prod') {
  const httpsOptions = {
    key: fs.readFileSync('/etc/ssl/live/startrail.com.br/privkey.pem'),
    cert: fs.readFileSync('/etc/ssl/live/startrail.com.br/fullchain.pem')
  };

  server = https.createServer(httpsOptions, app);

  server.listen(3443, () => {
    console.log('Servidor HTTPS rodando na porta 3443');
  });
} else {
  server = app.listen(3001, () => console.log('ouvindo na porta 3001'));
}

const io = socketIo(server);

const userSockets = {};

io.on('connection', (socket) => {
  // const userId = socket.userId || null;

  // if (userId) {
  //   userSockets[userId] = socket;
  //   console.log(`Usuário com ID ${userId} conectado.`);
  // }

  console.log('Um cliente se conectou.');

  socket.on('authentication', (data) => {
    const { token } = data;

    const user = authenticateUserWithToken(token);

    if (user) {
      console.log('Usuário autenticado com sucesso.');

      socket.userId = user.id;

      socket.emit('authenticationSuccess', { message: 'Autenticação bem-sucedida' });
    } else {
      console.log('Falha na autenticação.');

      socket.emit('authenticationError', { message: 'Falha na autenticação' });

      socket.disconnect();
    }
  });

  

  socket.on('disconnect', () => {
    console.log('Um cliente se desconectou.');
  });
});
