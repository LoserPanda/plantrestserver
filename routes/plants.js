const express = require('express');
const router = express.Router();

//CONNECT TO THE DATABASE
const mysql = require('mysql');
const dbconfig = require('../config/dbconfig');

const connection = mysql.createConnection(dbconfig.dbconnection);

connection.connect(err => {
    if (err) throw err;
    // console.log('Connected to the database');

    // //GET PLANTS BY USER ID
    // router.get('/:userID', (req, res, next) => {
    //     connection.query('SELECT * FROM plants WHERE userID = ?', [req.params.userID], (err, results) => {
    //         if (err) throw err;
    //         //console.log(results);
    //         res.send(results);
    //     });
    // });

    // //GET SENSORDATA AND SENSORS
    // router.get('/byuserid/:userID', (req, res, next) => {
    //     connection.query('SELECT sensordata.time, sensordata.light, sensordata.humidity, sensordata.temperature, sensordata.soilmoisture FROM sensordata INNER JOIN sensors ON sensors.sensorID=sensordata.sensorID WHERE userID = ?', [req.params.userID], (err, results) => {
    //         if (err) throw err;
    //         //console.log(results);
    //         res.send(results);
    //     });
    // });

    //GET PLANTS SENSOR SOIL (SOIL AVG TEST)
    router.get('/averages/:userID', (req, res, next) => {
        connection.query('SELECT soilAvg, lightAvg, temperatureAvg, humidityAvg FROM plants INNER JOIN users ON users.userID=plants.userID WHERE users.userID = ?', [req.params.userID], (err, results) => {
            if (err) throw err;
            //console.log(results);
            res.send(results);
        });
    });

    router.get('/getbyuserid/:userID', (req, res, next) => {
        connection.query('SELECT * FROM plants INNER JOIN users ON users.userID=plants.userID WHERE users.userID = ?', [req.params.userID], (err, results) => {
            if (err) throw err;
            //console.log(results);
            res.send(results);
        });
    });

    router.get('/getphoto/:userID', (req, res, next) => {
        connection.query('SELECT * FROM plants INNER JOIN users ON users.userID=plants.userID WHERE users.userID = ?', [req.params.userID], (err, results) => {
            if (err) throw err;
            //console.log(results);
            res.send(results);
        });
    });

    //POST NEW PLANT TO THE DATABASE
    router.post('/update', (req, res, next) => {
        connection.query('UPDATE plants SET name=?, photolink=?, soilAvg=?, lightAvg=?, humidityAvg=?, temperatureAvg=? WHERE plantID=?', [req.body.name, req.body.photolink, req.body.soilAvg, req.body.lightAvg, req.body.humidityAvg, req.body.temperatureAvg, req.body.plantID], (err, results) => {
            if (err) throw err;
            console.log(results);
            res.send(results);
        });
    });

    router.get('/plantconditions/:userID', (req, res, next) => {
        connection.query('SELECT * FROM sensordata INNER JOIN sensors ON sensors.sensorID=sensordata.sensorID WHERE userID = ? ORDER BY time DESC LIMIT 1', [req.params.userID], (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });

});

module.exports = router;
