var express = require('express');
var app = express();
var PORT = 2000;

// app.get('/', function(req, res) {
//     res.send('Hello Express!');
// });

var middleware = {
    requireAuthentication: function (req, res, next) {
        console.log('Private log hit...');
        next();
    },
    logger:
        function (req, res, next) {
            console.log('Request: ' + new Date().toString() + ' ' + req.method + ' ' + req.originalUrl);
            next();
        }
};

app.use(middleware.logger);

app.get('/about', middleware.requireAuthentication, function (req, res) {
    res.send('About us...');
});
app.use(express.static(__dirname + '/public'));
app.listen(PORT, function () {
    console.log('Express Server Started on : ' + PORT);
});