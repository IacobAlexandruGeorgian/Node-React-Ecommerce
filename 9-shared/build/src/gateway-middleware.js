"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyGatewayRequest = verifyGatewayRequest;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_handler_1 = require("./error-handler");
const tokens = ['auth', 'seller', 'gig', 'search', 'buyer', 'message', 'order', 'review'];
function verifyGatewayRequest(req, _res, next) {
    if (!req.headers?.gatewaytoken) {
        throw new error_handler_1.NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway');
    }
    const token = req.headers?.gatewaytoken;
    if (!token) {
        throw new error_handler_1.NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway');
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, '1282722b942e08c8a6cb033aa6ce850e');
        if (!tokens.includes(payload.id)) {
            throw new error_handler_1.NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request payload is invalid');
        }
    }
    catch (error) {
        throw new error_handler_1.NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway');
    }
    next();
}
//# sourceMappingURL=gateway-middleware.js.map