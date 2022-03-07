const mongoose = require('mongoose');
const httpStatus = require('http-status');
const ApiError = require('../Utils/APIError');
const { send } = require('./responseHandler');

const errorConverter = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode =
            error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
};

const errorHandler = (err, req, res, next) => {
    let { 
        statusCode, 
        message 
    } = err;
    if(!(statusCode)){
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    if(!(message)){
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }
    send(message,[], res,statusCode);
};

module.exports = {
    errorConverter,
    errorHandler,
};
