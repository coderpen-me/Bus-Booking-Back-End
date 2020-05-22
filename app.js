const express = require('express');
const path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

const app = express();

var cors = require('cors');
var routes = require('./routes/router.js');

const PORT = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://root:BNPZEr5FzQ1W@18.217.242.214/admin', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
    console.log("Connected to DB");
});
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log(`Error while connecting to DB ${err}`);
    }
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', routes);
app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});