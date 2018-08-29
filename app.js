const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

app.use(cookieSession({
    maxAge: 1 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
}));

app.use(passport.initialize());
app.use(passport.session());

//GET ROUTERS
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const sensorsRouter = require('./routes/sensors');
const sensordataRouter = require('./routes/sensordata');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

//USE ROUTERS
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sensors', sensorsRouter);
app.use('/sensordata', sensordataRouter);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});