var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var videoRouter = require('./routes/videos');
var favoriteListRouter = require('./routes/favoritelist');
var authRouter = require('./routes/auth');
var streamRouter = require('./routes/stream');
var uploadRouter = require('./routes/upload');

var app = express();
async function connectToDatabase() {
  try {
      await mongoose.connect(process.env.MONGODB_URL);
      console.log('Connected Mongodb!');
  } catch (error) {
      console.error('Connect error!', error);
  }
}
connectToDatabase();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/getdata', indexRouter);
app.use('/user', usersRouter);
app.use('/video', videoRouter);
app.use('/favoritelist', favoriteListRouter);
app.use('/auth', authRouter);
app.use('/stream', streamRouter);
app.use('/upload', uploadRouter)
module.exports = app;