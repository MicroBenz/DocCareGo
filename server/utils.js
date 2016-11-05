module.exports = {
    methodNotAllowed: methodNotAllowed,
    responseMissingField: responseMissingField
};

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