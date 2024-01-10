const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const chatController = require('./controllers.js/chatController.js');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index', { io }); // Pass io object to the view
});

io.on('connection', (socket) => {
  chatController.handleConnection(io, socket); // Pass io object to the controller
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
