module.exports = function (app, express) {
    var jwt = require('jsonwebtoken');
    var bcrypt = require('bcrypt-nodejs');
    var User = require('../model/User');
    var authRoutes = express.Router();
    
    authRoutes.post('/login', login);

    function login (req, res) {
        User.findOne({
            username: req.body.username
        })
        .then(
            function (user) {
                if (!user) {
                    user = {
                        password: bcrypt.hashSync('')
                    };
                }
                
                if (!bcrypt.compareSync(req.body.password, user.password)) {
                    res.json({
                        success: false,
                        message: 'Login Failed!',
                        clientMessage: 'Wrong Username or Password'
                    });
                }
                else {
                    user = user.toObject();
                    delete user.password;
                    var token = jwt.sign(user, app.get('tokenSecret'), {
                        expiresIn: 1440*60
                    });

                    res.json({
                        success: true,
                        message: 'Login Success',
                        data: {
                            token: token,
                            role: user.role
                        }
                    });
                }
            },
            function (error) {
                console.log(error);
                throw error;
            }
        );
    }

    app.use('/auth', authRoutes);
};