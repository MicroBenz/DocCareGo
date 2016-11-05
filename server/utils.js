module.exports = {
    checkRole: checkRole,
    methodNotAllowed: methodNotAllowed,
    responseMissingField: responseMissingField
};

function checkRole (req, res, arrayOfRole) {
    let isCorrectedRole = false;
    arrayOfRole.forEach(
        function (role) {
            if(req.decoded.role === role)
                isCorrectedRole = true;
        }
    );
    if(!isCorectedRole) {
        res.status(400).send({
            status: 'Bad Request',
            message: 'This API is not allowed for your role.'
        });
    }
}

function methodNotAllowed (req, res) {
    res.status(405).send({
        success: false,
        status: 'Method Not Allowed',
        message: 'This method is not allowed for this API.'
    });
}

function responseMissingField (res, field) {
    res.status(400).send({
        success: false,
        status: 'Bad Request',
        message: field + ' field is required.'
    });
}