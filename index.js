const express = require("express");
const path = require("path");
// const connectDB = require("./db/connect");
const morgan = require("morgan");
// const cookieParser = require("cookie-parser");
// const fileUpload = require("express-fileupload");
// const mongoSanitize = require("express-mongo-sanitize");
const { rateLimit } = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
require("dotenv").config();
require("express-async-errors");

const authRouter = require("./routes/auth-route");
const countryRouter = require("./routes/country-route");

const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

const app = express();

app.use(morgan("tiny"));
// app.use(express.json());
// app.use(fileUpload());
// app.set("trust proxy", "192.168.1.135");

// app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
//     message: {
//       message: "Too many requests",
//     },
//   })
// );

// app.use(cors());
app.use(helmet());
app.use(xss());
// app.use(mongoSanitize());

app.use(
  cors({
    // origin: ["http://localhost:3000"],
    allowedHeaders: [
      "Authorization",
      "Content-Type",
      "x-localization",
      "user-agent",
    ],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
// app.use(cookieParser());
app.use("/assets", express.static(path.join(__dirname, "assets")));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: (req) => (req?.user ? 1000 : 100),
  message: { error: "Too many requests" },
  standardHeaders: true,
  legacyHeaders: true,
  keyGenerator: (req) => req.ip,
});
app.use(limiter);

// app.use(cookieParser(process.env.JWT_SECRET));
// app.use(express.static("./public"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/country", countryRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // await connectDB(process.env.MONGO_URL);

  try {
    await app.listen(PORT);
    console.log("PORT connected");
  } catch (err) {
    console.log(err);
  }
};
startServer();
