const express = require('express');
const router = express.Router();

//CONNECT TO THE DATABASE
const mysql = require('mysql');
const dbconfig = require('../config/dbconfig');

const connection = mysql.createConnection(dbconfig.dbconnection);

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to the database sensordata');

    const authCheck = (req, res, next) => {
        if (!req.user) {
            res.redirect('/auth/login');
        } else {
            console.log(req.user, "jou");
            next();
        }
    };

    //GET ALL SENSORDATA
    router.get('/', authCheck, (req, res, next) => {
        connection.query('SELECT * FROM sensordata', (err, results) => {
            if (err) throw err;
            //console.log(results);
            res.send(results);
        });
    });

    //GET SENSORDATA BY ID
    router.get('/:sensorID', authCheck, (req, res, next) => {
        connection.query('SELECT * FROM sensordata WHERE sensorID = ?', [req.params.sensorID], (err, results) => {
            if (err) throw err;
            //console.log(results);
            res.send(results);
        });
    });

    //GET LIGHT BY ID
    router.get('/:sensorID', authCheck, (req, res, next) => {
        connection.query('SELECT light FROM sensordata WHERE sensorID = ?', [req.params.sensorID], (err, results) => {
            if (err) throw err;
            //console.log(results);
            res.send(results);
        });
    });

    //GET HUMIDITY BY ID
    router.get('/:sensorID', authCheck, (req, res, next) => {
        connection.query('SELECT humidity FROM sensordata WHERE sensorID = ?', [req.params.sensorID], (err, results) => {
            if (err) throw err;
            //console.log(results);
            res.send(results);
        });
    });

    //GET TEMPERATURE BY ID
    router.get('/:sensorID', authCheck, (req, res, next) => {
        connection.query('SELECT temperature FROM sensordata WHERE sensorID = ?', [req.params.sensorID], (err, results) => {
            if (err) throw err;
            //console.log(results);
            res.send(results);
        });
    });

    //GET SOILMOISTURE BY ID
    router.get('/:sensorID', authCheck, (req, res, next) => {
        connection.query('SELECT soilmoisture FROM sensordata WHERE sensorID = ?', [req.params.sensorID], (err, results) => {
            if (err) throw err;
            //console.log(results);
            res.send(results);
        });
    });


});

module.exports = router;