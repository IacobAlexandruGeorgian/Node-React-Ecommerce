"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayServer = void 0;
const shared_1 = require("@iacobalexandrugeorgian/shared");
const express_1 = require("express");
const cookie_session_1 = __importDefault(require("cookie-session"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const hpp_1 = __importDefault(require("hpp"));
const compression_1 = __importDefault(require("compression"));
const http_status_codes_1 = require("http-status-codes");
const http_1 = __importDefault(require("http"));
const SERVER_PORT = 4000;
const log = (0, shared_1.winstonLogger)('http://localhost:9200', 'apiGatewayServer', 'debug');
class GatewayServer {
    constructor(app) {
        this.app = app;
    }
    start() {
        this.securityMiddleware(this.app);
        this.standardMiddleware(this.app);
        // this.routesMiddleware(this.app);
        // this.startElasticSearch();
        this.errorHandler(this.app);
        this.startServer(this.app);
    }
    securityMiddleware(app) {
        app.set('trust proxy', 1);
        app.use((0, cookie_session_1.default)({
            name: 'session',
            keys: [],
            maxAge: 24 * 7 * 3600000,
            secure: false // update with value from config
            // sameSite: none
        }));
        app.use((0, hpp_1.default)());
        app.use((0, helmet_1.default)());
        app.use((0, cors_1.default)({
            origin: '',
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
        }));
    }
    standardMiddleware(app) {
        app.use((0, compression_1.default)());
        app.use((0, express_1.json)({ limit: '200mb' }));
        app.use((0, express_1.urlencoded)({ extended: true, limit: '200mb' }));
    }
    // private routesMiddleware(app: Application): void {
    // }
    // private startElasticSearch(): void {
    // }
    errorHandler(app) {
        app.use('*', (req, res, next) => {
            const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
            log.log('error', `${fullUrl} endpoint does not exist.`, '');
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: 'The endpoint called does not exist.' });
            next();
        });
        app.use((error, _req, res, next) => {
            if (error instanceof shared_1.CustomError) {
                log.log('error', `GatewayService ${error.comingFrom}:`, error);
                res.status(error.statusCode).json(error.serializeErrors());
                next();
            }
        });
    }
    startServer(app) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const httpServer = new http_1.default.Server(app);
                this.startHttpServer(httpServer);
            }
            catch (error) {
                log.log('error', 'GatewayService startServer() error method:', error);
            }
        });
    }
    startHttpServer(httpServer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                log.info(`Gateway server has started with process id ${process.pid}`);
                httpServer.listen(SERVER_PORT, () => {
                    log.info(`Gateway server running on port ${SERVER_PORT}`);
                });
            }
            catch (error) {
                log.log('error', 'GatewayService startServer() error method:', error);
            }
        });
    }
}
exports.GatewayServer = GatewayServer;
//# sourceMappingURL=server.js.map