const users = {};

exports.index = (req, res) => {
  res.render('index');
};

exports.handleConnection = (io, socket) => {
  socket.on('join', (data) => {
    users[socket.id] = { name: data.name, key: data.key };
    io.emit('userList', Object.values(users));
    io.emit('message', { text: `${data.name} joined the chat.`, color: 'green' });
  });

  socket.on('disconnect', () => {
    if (users[socket.id]) {
      const { name } = users[socket.id];
      delete users[socket.id];
      io.emit('userList', Object.values(users));
      io.emit('message', { text: `${name} left the chat.`, color: 'red' });
    }
  });

  socket.on('sendMessage', (data) => {
    io.emit('message', { text: `${data.name}: ${data.message}`, color: 'black' });
  });
};
