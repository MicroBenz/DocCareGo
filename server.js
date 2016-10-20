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

console.log(process.env.APP_DEBUG);
var clientRoot = process.env.APP_DEBUG == 'true' ? 'web/dist' : 'web/prod';
app.use(express.static(clientRoot));
console.log(clientRoot);
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/' + clientRoot + '/index.html');
});

var mongoose = require('mongoose');
var database = process.env.DB_HOST;
mongoose.connect(database);
mongoose.Promise = global.Promise;

require('./server/main.api')(app, express);
module.exports = app;