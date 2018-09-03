const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//GET ROUTERS
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const sensorsRouter = require('./routes/sensors');
const sensordataRouter = require('./routes/sensordata');
const plantsRoutes = require('./routes/plants');

//USE ROUTERS
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sensors', sensorsRouter);
app.use('/sensordata', sensordataRouter);
app.use('/plants', plantsRoutes);

app.listen(3001, () => {
    console.log('Listening on port 3001');
});
