var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var unless = require('express-unless');

var config = require('./config');
var authRoutes = require('./routes/authRoutes');

var port = process.env.PORT || 9000;
mongoose.connect(config.database);

app.use(cors());
app.use(function (req, res, next) {
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
        if (req.method === 'OPTIONS') return res.send(200);
    }
    next();
});
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/auth', authRoutes);
app.use('/api', expressJwt({secret: config.secret}));

app.listen(port, function() {
    console.log('Reached Port ' + port);
});