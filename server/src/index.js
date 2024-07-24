"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pokemon_1 = __importDefault(require("./routes/pokemon"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
var cors = require("cors");
const cookieParser = require("cookie-parser");
const csrf = require("csrf");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const csrfProtection = csrf();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(cookieParser());
const allowedOrigins = ["http://localhost:5174", "http://localhost:4173"];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express_1.default.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//   if (!req.cookies.csrfToken) {
//     const token = csrfProtection.create(
//       req.cookies.csrfSecret || csrfProtection.secretSync()
//     );
//     res.cookie("csrfToken", token);
//   }
//   next();
// });
app.get("/api/csrf-token", (req, res) => {
    const token = csrfProtection.create(req.cookies.csrfSecret || csrfProtection.secretSync());
    res.cookie("csrfToken", token);
    res.json();
});
const verifyCsrfToken = (req, res, next) => {
    const token = req.headers.csrfsecret;
    const secret = req.cookies.csrfToken;
    console.log(req.headers);
    console.log(req.cookies);
    console.log(secret != undefined && token != undefined && secret == token);
    if (secret != undefined && token != undefined && secret == token) {
        next();
    }
    else {
        res.status(403).json({
            message: "Invalid CSRF token",
            error: true,
            data: null,
        });
    }
};
app.use("/", verifyCsrfToken, pokemon_1.default);
app.use("*", (req, res) => {
    res.status(404).json({
        message: "Route not found",
        error: true,
        data: null,
    });
});
//global error handler
app.use((err, req, res, next) => {
    var _a;
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    const axiosError = err;
    statusCode = ((_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.status) || 500;
    if (statusCode === 404) {
        message = "Data not found againt given id";
    }
    else {
        message = axiosError.message || "Axios Request Failed";
    }
    res.status(statusCode).json({
        message,
        error: process.env.NODE_ENV === "development" ? true : {},
        data: null,
    });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
