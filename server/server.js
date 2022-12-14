const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// socket.io
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: ["https://morning-sands-43472.herokuapp.com", "http://localhost:3000"]
  }
});
io.on('connection', socket => {
  console.log(socket.id);
  socket.on('update dispatch', (string) => {
    console.log(string);
    io.emit('update', string);
  });
  socket.on('update technician', (string) => {
    console.log(string),
    io.emit('update technician', string);
  });
});

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const messageRouter = require('./routes/message.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/message', messageRouter)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */

// app.listen(PORT, () => {
//   console.log(`Listening on port: ${PORT}`);
// });

// socket.io server 
server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});