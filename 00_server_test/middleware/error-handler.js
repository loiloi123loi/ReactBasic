const { StatusCodes } = require('http-status-codes');

const errorHandle = (err, req, res, next) => {
    const customErr = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something was wrong',
    };
    console.log(customErr);
    res.status(customErr.statusCode).json({ msg: customErr.msg });
};

module.exports = errorHandle;
