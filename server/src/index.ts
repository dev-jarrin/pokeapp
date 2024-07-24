import express, { Request, Response, NextFunction } from "express";
import pokemonRouter from "./routes/pokemon";
import dotenv from "dotenv";
import morgan from "morgan";
import axios, { AxiosError } from "axios";
var cors = require("cors");
const cookieParser = require("cookie-parser");
const csrf = require("csrf");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const csrfProtection = csrf();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = ["http://localhost:5174", "http://localhost:4173"];

const corsOptions = {
  origin: (origin: string, callback: Function) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

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
  const token = csrfProtection.create(
    req.cookies.csrfSecret || csrfProtection.secretSync()
  );
  res.cookie("csrfToken", token);
  res.json();
});

const verifyCsrfToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.csrfsecret as string;
  const secret = req.cookies.csrfToken as string;
  console.log(req.headers);
  console.log(req.cookies);
  console.log(secret != undefined && token != undefined && secret == token);
  if (secret != undefined && token != undefined && secret == token) {
    next();
  } else {
    res.status(403).json({
      message: "Invalid CSRF token",
      error: true,
      data: null,
    });
  }
};

app.use("/", verifyCsrfToken, pokemonRouter);

app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    message: "Route not found",
    error: true,
    data: null,
  });
});

//global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  const axiosError = err as AxiosError;
  statusCode = axiosError.response?.status || 500;
  if (statusCode === 404) {
    message = "Data not found againt given id";
  } else {
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
