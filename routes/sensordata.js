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

    //GET FILTERED SENSORDATA AND SENSORS GROUP BY HOUR || TOIMII
    router.get('/minute/byuserid/:userID', (req, res, next) => {
        connection.query('SELECT sensordata.time, ROUND(AVG(sensordata.soilmoisture), 0) AS "soilmoisture", ROUND(AVG(sensordata.light), 0) AS "light", ROUND(AVG(sensordata.temperature), 0) AS "temperature", ROUND(AVG(sensordata.humidity), 0) AS humidity FROM sensordata INNER JOIN sensors ON sensors.sensorID=sensordata.sensorID WHERE userID = ? AND time >= NOW() - INTERVAL 1 HOUR GROUP BY YEAR(time), MONTH(time), DAY(time), HOUR(time), MINUTE(time) ORDER BY time ASC', [req.params.userID], (err, results) => {
            if (err) throw err;
            //console.log(results);
            res.send(results);
        });
    });

    //GET FILTERED SENSORDATA AND SENSORS GROUP BY HOUR || TOIMII
    router.get('/hour/byuserid/:userID', (req, res, next) => {
        connection.query('SELECT sensordata.time, ROUND(AVG(sensordata.soilmoisture), 0) AS "soilmoisture", ROUND(AVG(sensordata.light), 0) AS "light", ROUND(AVG(sensordata.temperature), 0) AS "temperature", ROUND(AVG(sensordata.humidity), 0) AS humidity FROM sensordata INNER JOIN sensors ON sensors.sensorID=sensordata.sensorID WHERE userID = ? AND time >= NOW() - INTERVAL 7 DAY GROUP BY YEAR(time), MONTH(time), DAY(time), HOUR(time) ORDER BY time ASC', [req.params.userID], (err, results) => {
            if (err) throw err;
            //console.log(results);
            res.send(results);
        });
    });

    //GET FILTERED SENSORDATA AND SENSORS GROUP BY DAY || TOIMII
    router.get('/day/byuserid/:userID', (req, res, next) => {
        connection.query('SELECT sensordata.time, ROUND(AVG(sensordata.soilmoisture), 0) AS "soilmoisture", ROUND(AVG(sensordata.light), 0) AS "light", ROUND(AVG(sensordata.temperature), 0) AS "temperature", ROUND(AVG(sensordata.humidity), 0) AS humidity FROM sensordata INNER JOIN sensors ON sensors.sensorID=sensordata.sensorID WHERE userID = ? AND time >= NOW() - INTERVAL 14 DAY GROUP BY YEAR(time), MONTH(time), DAY(time) ORDER BY time ASC', [req.params.userID], (err, results) => {
            if (err) throw err;
            //console.log(results);
            res.send(results);
        });
    });

    //GET FILTERED SENSORDATA AND SENSORS GROUP BY MONTH || TOIMII
    router.get('/month/byuserid/:userID', (req, res, next) => {
        connection.query('SELECT sensordata.time, ROUND(AVG(sensordata.soilmoisture), 0) AS "soilmoisture", ROUND(AVG(sensordata.light), 0) AS "light", ROUND(AVG(sensordata.temperature), 0) AS "temperature", ROUND(AVG(sensordata.humidity), 0) AS "humidity" FROM sensordata INNER JOIN sensors ON sensors.sensorID=sensordata.sensorID WHERE userID = ? AND time >= NOW() - INTERVAL 1 YEAR GROUP BY YEAR(time), MONTH(time) ORDER BY time ASC', [req.params.userID], (err, results) => {
            if (err) throw err;
            //console.log(results);
            res.send(results);
        });
    });

    //GET FILTERED SENSORDATA AND SENSORS GROUP BY YEAR || TOIMII
    router.get('/year/byuserid/:userID', (req, res, next) => {
        connection.query('SELECT sensordata.time, ROUND(AVG(sensordata.soilmoisture), 0) AS "soilmoisture", ROUND(AVG(sensordata.light), 0) AS "light", ROUND(AVG(sensordata.temperature), 0) AS "temperature", ROUND(AVG(sensordata.humidity), 0) AS humidity FROM sensordata INNER JOIN sensors ON sensors.sensorID=sensordata.sensorID WHERE userID = ? GROUP BY YEAR(time) ORDER BY time ASC', [req.params.userID], (err, results) => {
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
