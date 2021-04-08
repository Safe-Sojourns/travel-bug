const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const axios = require('axios');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(morgan('dev'));

io.on('connection', socket => {
  socket.on('chat message', data => {
    socket.emit('new messages', data);
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

server.listen(4000, () => console.log('socketIO listening at 4000'));
