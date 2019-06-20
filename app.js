var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');
var verify = require('./verify');
var cors = require('cors');
// const testurl = 'mongodb://localhost:27017/test_mydb';
const url = 'mongodb://localhost:27017/mydb';
const connect = mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true
});

connect.then((db) => {
    console.log("Connected to mongodb server");
}, (err) => { console.log(err); });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var heroesRouter = require('./routes/heroes');
var villainsRouter = require('./routes/villains');
var uploadRouter = require('./routes/upload');
var matchesRouter = require('./routes/matches');

var app = express();

app.use(logger('dev'));
app.use(express.json()); // same as bodyParser.json()
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    name: 'session-id',
    secret: 'mysessionkey',
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
}));

app.use(passport.initialize());
app.use(passport.session());



app.use('*', cors({
    origin: 'http://localhost:5500',
    credentials: true
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(verify.user);
app.use('/upload', uploadRouter);
app.use('/heroes', heroesRouter);
// app.use(verify.admin);
app.use('/villains', villainsRouter);
app.use('/matches', matchesRouter);
module.exports = app;
