const express = require('express');
const router = express.Router();

//CONNECT TO THE DATABASE
const mysql = require('mysql');
const dbconfig = require('../config/dbconfig');

const connection = mysql.createConnection(dbconfig.dbconnection);

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to the database');

    //GET ALL USERS
    router.get('/', (req, res, next) => {
        console.log("uuseri lakaa", req.user, "palautettu uuuseri lol");
        connection.query('SELECT * FROM users',(err, results) => {
            if (err) throw err;
            console.log(results);
            res.send(results);
        });
    });

    //GET USER BY ID
    router.get('/:userID', (req, res, next) => {
        connection.query('SELECT * FROM users WHERE userID = ?', [req.params.userID], (err, results) => {
            if (err) throw err;
            //console.log(results);
            res.send(results);
        });
    });

    //POST NEW USER TO THE DATABASE
    router.post('/', (req, res, next) => {
        connection.query('INSERT INTO users (userID, email) VALUES (?, ?) ON DUPLICATE KEY UPDATE userID = ?, email = ?', [req.body.userID, req.body.email, req.body.userID, req.body.email], (err, results) => {
            if (err) throw err;
            console.log(results);
            res.send(results);
        });
    });

});

module.exports = router;
