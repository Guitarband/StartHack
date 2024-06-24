let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let landingRouter = require('./routes/landing');
let aboutRouter = require('./routes/about');
let solutionsRouter = require('./routes/solutions');
let loginRouter = require('./routes/login');

let portfolioRouter = require('./routes/portfolio');
let exploreRouter = require('./routes/explore');
let settingsRouter = require('./routes/settings');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', landingRouter);

app.use('/about', aboutRouter);
app.use('/solutions', solutionsRouter);
app.use('/login', loginRouter);

app.use('/portfolio', portfolioRouter);
app.use('/explore', exploreRouter);
app.use('/settings', settingsRouter);


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
