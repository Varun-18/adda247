"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./features/routes"));
// import router from 'routes';
const app = (0, express_1.default)();
exports.app = app;
dotenv_1.default.config();
/**
 * view engine
 */
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
// Middlewares
/**
 * Security middleware to set various HTTP headers
 */
app.use((0, helmet_1.default)());
/**
 * Cookie parser middleware
 */
app.use((0, cookie_parser_1.default)());
/**
 * The middleware for handling cross origin resource sharing
 */
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin',
}));
/**
 * compression middleware for compressing the response body
 */
app.use((0, compression_1.default)({
    threshold: 1024,
    level: 6,
}));
/**
 * Logger for production
 * TODO : configure for production using env
 */
app.use((0, morgan_1.default)('dev'));
/**
 * Middleware for parsing the json payload
 * Maximum payload upto 5mb can pass
 */
app.use(express_1.default.json({
    limit: '5mb',
    strict: true,
}));
/**
 * Parse URL encoded bodies
 * To get the URL Encoded form data
 */
app.use(express_1.default.urlencoded({ extended: true }));
/**
 * Rate limitter for limiting the number of request every 15 mins.
 */
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: 'Too many requests, please try again later.',
    statusCode: 429,
    headers: true,
});
app.use(limiter);
/**
 * Router for custom configurations
 */
app.use('/', routes_1.default);
const connectToDatabase = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI || '');
        console.log('Mongo conncetion successful');
    }
    catch (err) {
        console.error('MongoDB connection error:', err);
    }
};
connectToDatabase();
