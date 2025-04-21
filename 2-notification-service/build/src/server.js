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
exports.start = start;
require("express-async-errors");
const http_1 = __importDefault(require("http"));
const shared_1 = require("../../node_modules/@iacobalexandrugeorgian/shared");
const config_1 = require("./config");
const routes_1 = require("./routes");
const elasticsearch_1 = require("./elasticsearch");
const SERVER_PORT = 4001;
const log = (0, shared_1.winstonLogger)(`${config_1.config.ELASTIC_SEARCH_URL}`, 'notificationServer', 'debug');
function start(app) {
    startServer(app);
    app.use('', (0, routes_1.healthRoutes)());
    startQueues();
    startElasticSearch();
}
function startQueues() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
function startElasticSearch() {
    (0, elasticsearch_1.checkConnection)();
}
function startServer(app) {
    try {
        const httpServer = new http_1.default.Server(app);
        log.info(`Worker with process id of ${process.pid} on notification server has started`);
        httpServer.listen(SERVER_PORT, () => {
            log.info(`Notification server running on port ${SERVER_PORT}`);
        });
    }
    catch (error) {
        log.log('error', 'NotificationService startServer() method:', error);
    }
}
//# sourceMappingURL=server.js.map