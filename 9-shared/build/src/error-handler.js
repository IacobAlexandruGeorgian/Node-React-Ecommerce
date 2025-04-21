"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = exports.FileTooLargeError = exports.NotAuthorizedError = exports.NotFoundError = exports.BadRequestError = exports.CustomError = void 0;
const http_status_codes_1 = require("http-status-codes");
class CustomError extends Error {
    constructor(message, comingFrom) {
        super(message);
        this.comingFrom = comingFrom;
    }
    serializeErrors() {
        return {
            message: this.message,
            statusCode: this.statusCode,
            status: this.status,
            comingFrom: this.comingFrom,
        };
    }
}
exports.CustomError = CustomError;
class BadRequestError extends CustomError {
    constructor(message, comingFrom) {
        super(message, comingFrom);
        this.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        this.status = 'error';
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends CustomError {
    constructor(message, comingFrom) {
        super(message, comingFrom);
        this.statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
        this.status = 'error';
    }
}
exports.NotFoundError = NotFoundError;
class NotAuthorizedError extends CustomError {
    constructor(message, comingFrom) {
        super(message, comingFrom);
        this.statusCode = http_status_codes_1.StatusCodes.UNAUTHORIZED;
        this.status = 'error';
    }
}
exports.NotAuthorizedError = NotAuthorizedError;
class FileTooLargeError extends CustomError {
    constructor(message, comingFrom) {
        super(message, comingFrom);
        this.statusCode = http_status_codes_1.StatusCodes.REQUEST_TOO_LONG;
        this.status = 'error';
    }
}
exports.FileTooLargeError = FileTooLargeError;
class ServerError extends CustomError {
    constructor(message, comingFrom) {
        super(message, comingFrom);
        this.statusCode = http_status_codes_1.StatusCodes.SERVICE_UNAVAILABLE;
        this.status = 'error';
    }
}
exports.ServerError = ServerError;
//# sourceMappingURL=error-handler.js.map