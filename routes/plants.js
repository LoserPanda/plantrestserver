const express = require('express');
const router = express.Router();

//CONNECT TO THE DATABASE
const mysql = require('mysql');
const dbconfig = require('../config/dbconfig');

const connection = mysql.createConnection(dbconfig.dbconnection);

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to the database');

    // //GET ALL USERS
    // router.get('/', (req, res, next) => {
    //     console.log("uuseri lakaa", req.user, "palautettu uuuseri lol");
    //     connection.query('SELECT * FROM users',(err, results) => {
    //         if (err) throw err;
    //         console.log(results);
    //         res.send(results);
    //     });
    // });

    //GET PLANTS BY USER ID
    router.get('/:userID', (req, res, next) => {
        connection.query('SELECT * FROM plants WHERE userID = ?', [req.params.userID], (err, results) => {
            if (err) throw err;
            //console.log(results);
            res.send(results);
        });
    });

    //POST NEW PLANT TO THE DATABASE
    router.post('/', (req, res, next) => {
        connection.query('INSERT INTO plants (plantID, name, photolink, userID) VALUES (?, ?, ?, ?)', [req.body.plantID, req.body.name, req.body.photolink, req.body.userID], (err, results) => {
            if (err) throw err;
            console.log(results);
            res.send(results);
        });
    });

});

module.exports = router;