
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// LAB 13 - NEW: Passport authentication
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// MongoDB Atlas connection
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CON)
  .then(() => {
    console.log('MongoDB Atlas connected successfully!');
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
  });

// LAB 13 - NEW: Account model
var Account = require('./models/account');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const resourceRouter = require('./routes/resource');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// LAB 13 - NEW: Express session middleware
app.use(require('express-session')({
  secret: process.env.SESSION_SECRET || 'lab13-development-secret',
  resave: false,
  saveUninitialized: false
}));

// LAB 13 - NEW: Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/products', productsRouter);
app.use('/resource', resourceRouter);

// LAB 13 - NEW: Passport configuration
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
