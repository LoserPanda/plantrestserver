const express = require('express');
const router = express.Router();

//CONNECT TO THE DATABASE
const mysql = require('mysql');
const dbconfig = require('../config/dbconfig');

const connection = mysql.createConnection(dbconfig.dbconnection);

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to the database');

    const authCheck = (req, res, next) => {
        if (!req.user) {
            res.redirect('/auth/login');
        } else {
            console.log(req.user, "jou");
            next();
        }
    };

    //GET ALL SENSORS
    router.get('/', authCheck, (req, res, next) => {
        connection.query('SELECT * FROM sensors', (err, results) => {
            if (err) throw err;
            //console.log(results);
            res.send(results);
        });
    });

    //GET SENSOR BY ID
    router.get('/:sensorID', authCheck, (req, res, next) => {
        connection.query('SELECT * FROM sensors WHERE sensorID = ?', [req.params.sensorID], (err, results) => {
            if (err) throw err;
            //console.log(results);
            res.send(results);
        });
    });

    //POST NEW SENSOR TO THE DATABASE
    router.post('/', authCheck, (req, res, next) => {
        connection.query('INSERT INTO sensors (sensorID, userID) VALUES (?, ?)', [req.body.sensorID, req.body.userID], (err, results) => {
            if (err) throw err;
            //console.log(results);
            res.send(results);
        });
    });


});

module.exports = router;