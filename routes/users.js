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

connection.connect(function (err) {
    if (err) throw err
    console.log('You are now connected...')

    router.get('/', function (req, res) {
        connection.query('SELECT * FROM sensordata', function (err, results) {
            if (err) throw err;
            res.json(results);
        });
    });


})
module.exports = router;
