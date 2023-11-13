"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const database_config_1 = __importDefault(require("./config/database.config"));
const product_1 = __importDefault(require("./routes/product"));
const users_1 = __importDefault(require("./routes/users"));
const page_1 = __importDefault(require("./routes/page"));
const app = (0, express_1.default)();
//DB Connection
database_config_1.default.sync().then(() => {
    console.log('Database connected successfully');
}).catch(error => {
    console.log(error);
});
// view engine setup
// Specify the directory where EJS templates are located (optional)
app.set('views', path_1.default.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');
// Serve static files from the "public" directory
app.use(express_1.default.static('public'));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/product', product_1.default);
app.use('/', users_1.default);
app.use('/', page_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// Error handling middleware
app.use(function (err, req, res, next) {
    res.status(err.status || 500); // Set the HTTP status code for the error
    // Render the error view with the error message
    res.render('error', {
        message: err.message,
        error: err // Pass the error object if needed
    });
});
exports.default = app;
