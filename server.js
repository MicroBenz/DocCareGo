var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
require('dotenv').config();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.set('tokenSecret', process.env.JWT_SECRET);

var port = process.env.PORT ? process.env.PORT : 5555;
app.listen(port, function () {
    console.log('Apps Listening on port ' + port);
});

app.use(express.static('web/dist'));
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/web/dist/index.html');
});

app.get('/api/v1/test', function (req, res) {
    res.json({
        message: 'text'
    });
});

app.post('/api/v1/test', function (req, res) {
    res.json({
        message: 'POST COMPLETED'
    });
});

var mongoose = require('mongoose');
var database = process.env.DB_HOST;
mongoose.connect(database);
mongoose.Promise = global.Promise;

require('./server/api/main.api')(app, express);
module.exports = app;