module.exports = function (app, express) {
    var jwt = require('jsonwebtoken');
    var bcrypt = require('bcrypt-nodejs');

    app.use('/api/v1', function (req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization;
        console.log('TOKEN: ', token);
        if (token) {
            token = token.split(' ');
            token = token[token.length - 1];
            jwt.verify(token, app.get('tokenSecret'), function (error, decoded) {
                if (error) {
                    return res.status(400).send({
                        success: false,
                        message: 'Authentication Failed.'
                    });
                }
                else {
                    req.decoded = decoded;
                    next();
                }
            });
        }
        else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });
};