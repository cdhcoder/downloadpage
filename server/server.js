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

api.get('/usefulLinks', function(req,res){
    var responseData = {};

    var query = connection.query('select name from product', function(err, rows){
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