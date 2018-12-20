var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var indexRouter = require('./routes/index');
var gardensRouter = require('./routes/gardens');
var usersRouter = require('./routes/users');
var registrationsRouter = require ('./routes/registrations');
var sessionsRouter = require ('./routes/session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({secret: 'blah'}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/libraries/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

app.use(function(req,res,next){
    res.locals.flash = req.flash();
    res.locals.current_user = req.user;
    next();
})

app.use('/', indexRouter);
app.use('/gardens', gardensRouter);
app.use('/register', registrationsRouter);

app.use('/users', usersRouter);

app.use('/log-in', sessionsRouter);
app.use('/logout', function(req, res, next){
  req.logout();
  req.flash('info', 'You have been logged out.');
  res.redirect('/');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));

});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.title="error";

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
