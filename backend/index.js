import "express-async-errors";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connection } from "./config/conncection.js";
import { responseStructure } from "./middleware/responseStructure.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import { fileURLToPath } from "url";
import { dirname } from "path";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
];

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);
app.use(mongoSanitize());
app.use(responseStructure);

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send("<h1>Wellcome to backend.</h1>");
});

connection(app);
