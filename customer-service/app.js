const port = 3001;

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let app = express();

let MongoDBUtil = require('./modules/mongodb/mongodb.module').MongoDBUtil;
let CustomerController = require('./modules/customer/customer.module')().CustomerController;
let ProductoController = require('./modules/producto/producto.module')().ProductoController;

const admin = require("firebase-admin");
const serviceAccount = require("./config/firebase/google.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

MongoDBUtil.init();

function checkAuth(req, res, next) {
  if (req.headers?.authorization?.startsWith('Bearer ')) {
    const idToken = req.headers.authorization.split('Bearer ')[1];
    admin.auth().verifyIdToken(idToken)
      .then(() => {
        next()
      }).catch((error) => {
        res.status(403).send('No autorizado por Token Invalido');
      });

  } else {
    res.status(403).send('No autorizado por Token Invalido');
  }
}
app.use('*', checkAuth);

app.use('/vendedores', CustomerController);
app.use('/productos', ProductoController);

app.get('/', function (req, res) {
  var pkg = require(path.join(__dirname, 'package.json'));
  res.json({
    name: pkg.name,
    version: pkg.version,
    status: 'up'
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: res.locals.message,
    error: res.locals.error
  });
});

module.exports = app;