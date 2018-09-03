const express = require('express');
const router = express.Router();

//CONNECT TO THE DATABASE
const mysql = require('mysql');
const dbconfig = require('../config/dbconfig');

const connection = mysql.createConnection(dbconfig.dbconnection);

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to the database sensordata');

    // //GET ALL SENSORDATA
    // router.get('/', (req, res, next) => {
    //     connection.query('SELECT * FROM sensordata', (err, results) => {
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

    //GET FILTERED SENSORDATA AND SENSORS
    router.get('/byuserid/:userID', (req, res, next) => {
        connection.query('SELECT sensordata.time, AVG(sensordata.soilmoisture) AS "soilmoisture", AVG(sensordata.light) AS "light", AVG(sensordata.temperature) AS "temperature", AVG(sensordata.humidity) AS "humidity" FROM sensordata INNER JOIN sensors ON sensors.sensorID=sensordata.sensorID WHERE userID = ? GROUP BY HOUR(time)', [req.params.userID], (err, results) => {
            if (err) throw err;
            //console.log(results);
            res.send(results);
        });
    });

    // //GET SENSORDATA BY ID
    // router.get('/:sensorID', (req, res, next) => {
    //     connection.query('SELECT * FROM sensordata WHERE sensorID = ?', [req.params.sensorID], (err, results) => {
    //         if (err) throw err;
    //         //console.log(results);
    //         res.send(results);
    //     });
    // });
    //
    // //GET LIGHT BY ID
    // router.get('/:sensorID', (req, res, next) => {
    //     connection.query('SELECT light FROM sensordata WHERE sensorID = ?', [req.params.sensorID], (err, results) => {
    //         if (err) throw err;
    //         //console.log(results);
    //         res.send(results);
    //     });
    // });
    //
    // //GET HUMIDITY BY ID
    // router.get('/:sensorID', (req, res, next) => {
    //     connection.query('SELECT humidity FROM sensordata WHERE sensorID = ?', [req.params.sensorID], (err, results) => {
    //         if (err) throw err;
    //         //console.log(results);
    //         res.send(results);
    //     });
    // });
    //
    // //GET TEMPERATURE BY ID
    // router.get('/:sensorID', (req, res, next) => {
    //     connection.query('SELECT temperature FROM sensordata WHERE sensorID = ?', [req.params.sensorID], (err, results) => {
    //         if (err) throw err;
    //         //console.log(results);
    //         res.send(results);
    //     });
    // });
    //
    // //GET SOILMOISTURE BY ID
    // router.get('/:sensorID', (req, res, next) => {
    //     connection.query('SELECT soilmoisture FROM sensordata WHERE sensorID = ?', [req.params.sensorID], (err, results) => {
    //         if (err) throw err;
    //         //console.log(results);
    //         res.send(results);
    //     });
    // });


});

module.exports = router;
