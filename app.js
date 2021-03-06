const path = require('path');
const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dbUrl = require('./middleware/db');

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

mongoose.Promise = global.Promise;
mongoose
  .connect(
    dbUrl.url,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

const authsRouter = require('./routes/authRouter');
const postsRouter = require('./routes/postRouter');
const menusRouter = require('./routes/navRouter');
const productsRouter = require('./routes/productRouter');
const usersRouter = require('./routes/userRouter');
const friendsRouter = require('./routes/friendRouter');
const employeesRouter = require('./routes/employeeRouter');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept,Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/users', authsRouter);
app.use('/api/posts', postsRouter);
app.use('/api/menus', menusRouter);
app.use('/api/products', productsRouter);
app.use('/api/getUsers', usersRouter);
app.use('/api/friends', friendsRouter);
app.use('/api/employees', employeesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
