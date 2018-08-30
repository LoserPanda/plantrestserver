const express = require('express');
const router = express.Router();
const app = express();
const mysql = require('mysql')
const bodyParser = require('body-parser');
const con = require('../config/serverconfig');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

const connection = mysql.createConnection({
    host: con.connection.host,
    user: con.connection.user,
    password: con.connection.password,
    database: con.connection.database
});

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

    //GET ALL USERS
    router.get('/', authCheck, (req, res, next) => {
        console.log("uuseri lakaa", req.user, "palautettu uuuseri lol");
        connection.query('SELECT * FROM users where userID = ?', [req.user.userID], (err, results) => {
            if (err) throw err;
            console.log(results);
            res.send(results);
        });
    });

    //TESTIKÄYTTÖÖÖÖNNN!!!!!!
    router.get('/test', (req, res, next) => {
        console.log("uuseri lakaa", req.user, "palautettu uuuseri lol");
        connection.query('SELECT * FROM users', (err, results) => {
            if (err) throw err;
            console.log(results);
            res.send(results);
        });
    });

    //GET USER BY ID
    router.get('/:userID', authCheck, (req, res, next) => {
        connection.query('SELECT * FROM users WHERE userID = ?', [req.params.userID], (err, results) => {
            if (err) throw err;
            //console.log(results);
            res.send(results);
        });
    });
    
    router.get('/', function (req, res) {
        connection.query('SELECT * FROM sensordata', function (err, results) {
            if (err) throw err;
            res.json(results);
        });
    });


})
module.exports = router;
