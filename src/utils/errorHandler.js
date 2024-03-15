const { omit } = require("lodash");

class ErrorWithStatus {
    message;
    status;
    constructor(status, message) {
        this.message = message;
        this.status = status;
    }
}

const defaultsErrorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json(omit(err, "status"));
};

const catchError = (func) => {
    return async (req, res, next) => {
        try {
            await func(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};

module.exports = {
    ErrorWithStatus,
    defaultsErrorHandler,
    catchError,
};
