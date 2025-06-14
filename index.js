const express = require("express");
const path = require("path");
// const connectDB = require("./db/connect");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

// const cookieParser = require("cookie-parser");
// const fileUpload = require("express-fileupload");
// const mongoSanitize = require("express-mongo-sanitize");
const { rateLimit } = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

require("dotenv").config();
require("express-async-errors");
require("./config/notification");
require("./config/cloudinary");

const adminAuthRouter = require("./routes/admin-auth-route");
const adminRouter = require("./routes/admin-route");
const storeAuthRouter = require("./routes/store-auth-route");
const userAuthRouter = require("./routes/user-auth-route");
const countryRouter = require("./routes/country-route");
const stateRouter = require("./routes/state-route");
const citiesRouter = require("./routes/city-route");
const categoryRouter = require("./routes/category-route");
const occasionRouter = require("./routes/occasion-route");
const productsRouter = require("./routes/product-route");
const storeBranchesRouter = require("./routes/branch-route");
const cartRouter = require("./routes/cart-route");
const infoRouter = require("./routes/info-route");
const supportRouter = require("./routes/support-route");
const notificationsRouter = require("./routes/notifications-route");
const deliveryTaxesRouter = require("./routes/delivery-taxes-route");

const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

const app = express();

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

app.use(cors());
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
      "x-forwarded-for",
    ],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
// app.use(cookieParser());
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(
  fileUpload({
    // limits: { fileSize: 3 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: (req) => (req?.user ? 1000 : 100),
  message: { error: "Too many requests" },
  standardHeaders: true,
  legacyHeaders: true,
  keyGenerator: (req) => req.ip,
});
app.use(limiter);
var now = new Date();
var night = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate() + 1, // the next day, ...
  0,
  0,
  0 // ...at 00:00:00 hours
);
var msTillMidnight = night.getTime() - now.getTime();
setTimeout(function () {
  reset(); //      <-- This is the function being called at midnight.
  now = new Date();
  night = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1, // the next day, ...
    0,
    0,
    0 // ...at 00:00:00 hours
  );
}, msTillMidnight);
async function reset() {
  console.log(
    "This function will check for the prices in products and update them every 24 hours based on the discount percentage"
  );
}
// app.use(cookieParser(process.env.JWT_SECRET));
// app.use(express.static("./public"));
app.get("/", (req, res) => {
  const deviceInfo = req.device; // 'phone', 'tablet', 'desktop', 'tv', 'bot'
  // isMobile: req.device.isMobile,
  // isTablet: req.device.isTablet,
  // isDesktop: req.device.isDesktop,
  // isTV: req.device.isTV,
  // isBot: req.device.isBot,
  // browser: req.headers["user-agent"],
  req.clientIp =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  const deviceData = {
    ip: req.clientIp,
    userAgent: req.headers["user-agent"],
    acceptLanguage: req.headers["accept-language"],
    connection: {
      secure: req.secure,
      httpVersion: req.httpVersion,
    },
  };

  console.log("Device request data:", deviceInfo);

  console.log("Device request data:", deviceData);
  console.log("Device request data:", req.headers["x-forwarded-for"]);
  console.log("Device request data:", req.connection.remoteAddress);

  console.log("Device request data:", req.socket.remoteAddress);
  res.json(deviceData);
});
app.use("/api/v1/users/auth", userAuthRouter);
app.use("/api/v1/admin/auth", adminAuthRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/stores/auth", storeAuthRouter);
app.use("/api/v1/store/branches", storeBranchesRouter);
app.use("/api/v1/countries", countryRouter);
app.use("/api/v1/states", stateRouter);
app.use("/api/v1/cities", citiesRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/occasions", occasionRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/info", infoRouter);
app.use("/api/v1/support", supportRouter);
app.use("/api/v1/notifications", notificationsRouter);
app.use("/api/v1/delivery-taxes", deliveryTaxesRouter);

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
