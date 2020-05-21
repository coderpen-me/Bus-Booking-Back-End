const express = require('express');
const path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

const app = express();

var cors = require('cors');
var routes = require('./routes/router.js');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});