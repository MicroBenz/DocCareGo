module.exports = function (app, express) {
    var jwt = require('jsonwebtoken');
    var authRoutes = express.Router();
    
    authRoutes.post('/login', login);

    function login (req, res) {
        var user = {
            'username': req.body.usr,
            'role': req.body.role
        };
        var token = jwt.sign(user, app.get('tokenSecret'));
        res.json({
            success: true,
            message: 'Login Success',
            clientMessage: 'Login Success',
            data: {
                token: token
            }
        });
    }

    app.use('/auth', authRoutes);
};