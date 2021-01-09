var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
require('dotenv').config();

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(upload.array()); 
app.use(express.static('public'));
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/v1', apiRouter);


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
const port = process.env.PORT || 5000;
//app.set('port', process.env.PORT || 8500);
//app.set('port',8500);
// var server = app.listen(app.get('port'), function() {
//   if(process.env.PORT) {
//       console.log('PORT is set!');
//     }
//     else {
//       console.log('PORT No set!'); 
//     }
//   console.log('Express server listening on port ' + server.address().port);
// });
// listen for requests

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;