const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const chatController = require('./controllers/chatController');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', chatController.index);

io.on('connection', chatController.handleConnection);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
