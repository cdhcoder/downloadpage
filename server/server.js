const express = require('express');
const app = express();
const api = require('./routes/index');
const cors = require('cors');
var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'qwer2134!',
    database: 'tmax'
});

connection.connect();
app.use(cors());
app.use('/api', api);
const port = 3002;

api.get('/navigator', function(req,res){
    var responseData = {};

    var query = connection.query('select name from navigator', function(err, rows){
        if (err) throw err;
        if (rows.length) {
            console.log(rows);
            responseData.result = 1;
            responseData.data = rows;
        } else {
            responseData.result = "0";
        }
        res.json(responseData);
    });
});

api.get('/download', function(req,res){
    var responseData = {};

    var query = connection.query('select * from download', function(err, rows){
        if (err) throw err;
        if (rows.length) {
            console.log(rows);
            responseData.result = 1;
            responseData.data = rows;
        } else {
            responseData.result = "0";
        }
        res.json(responseData);
    });
});

api.get('/manual', function(req,res){
    var responseData = {};

    var query = connection.query('select * from manual', function(err, rows){
        if (err) throw err;
        if (rows.length) {
            console.log(rows);
            responseData.result = 1;
            responseData.data = rows;
        } else {
            responseData.result = "0";
        }
        res.json(responseData);
    });
});

api.get('/notice', function(req,res){
    var responseData = {};

    var query = connection.query('select * from notice', function(err, rows){
        if (err) throw err;
        if (rows.length) {
            console.log(rows);
            responseData.result = 1;
            responseData.data = rows;
        } else {
            responseData.result = "0";
        }
        res.json(responseData);
    });
});

api.get('/product', function(req,res){
    var responseData = {};

    var query = connection.query('select * from product', function(err, rows){
        if (err) throw err;
        if (rows.length) {
            console.log(rows);
            responseData.result = 1;
            responseData.data = rows;
        } else {
            responseData.result = "0";
        }
        res.json(responseData);
    });
});

api.get('/releaseNotes', function(req,res){
    var responseData = {};

    var query = connection.query('select * from release_notes', function(err, rows){
        if (err) throw err;
        if (rows.length) {
            console.log(rows);
            responseData.result = 1;
            responseData.data = rows;
        } else {
            responseData.result = "0";
        }
        res.json(responseData);
    });
});

api.get('/usefulLinks', function(req,res){
    var responseData = {};

    var query = connection.query('select * from useful_links', function(err, rows){
        if (err) throw err;
        if (rows.length) {
            console.log(rows);
            responseData.result = 1;
            responseData.data = rows;
        } else {
            responseData.result = "0";
        }
        res.json(responseData);
    });
});

api.get('/utility', function(req,res){
    var responseData = {};

    var query = connection.query('select * from utility', function(err, rows){
        if (err) throw err;
        if (rows.length) {
            console.log(rows);
            responseData.result = 1;
            responseData.data = rows;
        } else {
            responseData.result = "0";
        }
        res.json(responseData);
    });
});

// 다운로드 수 카운트
api.put('/count', function(req,res){
    var responseData = {};
    const cnt = req.body.cnt;

    var query = connection.query('update counter set cnt=(?)', [cnt], function(err, rows){
        if (err) throw err;
        if (rows.length) {
            console.log(rows);
            responseData.result = 1;
            responseData.data = rows;
        } else {
            responseData.result = "0";
        }
        res.json(responseData);
    });
});

api.get('/counter', function(req,res){
    var responseData = {};

    var query = connection.query('select cnt from counter', function(err, rows){
        if (err) throw err;
        if (rows.length) {
            console.log(rows);
            responseData.result = 1;
            responseData.data = rows;
        } else {
            responseData.result = "0";
        }
        res.json(responseData);
    });
});

app.listen(port, ()=>console.log(`Listening on port ${port}`));