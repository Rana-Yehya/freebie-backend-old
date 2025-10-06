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
const i18n = require("i18n");

require("dotenv").config();
require("express-async-errors");
require("./config/notification");
require("./config/image-kit");
require("./helpers/cron/check-product-discount-job");
const { prisma } = require("./config/prisma");

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
const ordersRouter = require("./routes/order-route");
const transactionsRouter = require("./routes/transaction-route");
const reviewsRouter = require("./routes/review-route");
const planLimitsRouter = require("./routes/plan-limit-route");
const subscriptionRouter = require("./routes/subscription-route");
const discountRouter = require("./routes/discount-route");
const adsRouter = require("./routes/ads-route");

const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const {
  localizationMiddleware,
} = require("./middleware/localization-middleware");
const { passwordEncrypt } = require("./utils/password-utils");

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
      // "X-localization",
      "User-Agent",
      "Max-Forwards",
      "Accept-Language",
    ],
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15
  max: (req) => (req?.user ? 100000000000000 : 100000000), //1000 : 100
  message: { error: "Too many requests" },
  standardHeaders: true,
  legacyHeaders: true,
  keyGenerator: (req) => req.ip,
});
app.use(limiter);

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

// Configure i18n
i18n.configure({
  locales: ["en", "ar"],
  directory: path.join(__dirname, "locales"),
  defaultLocale: "en",
  autoReload: true,
  syncFiles: true,
  // objectNotation: true,
  logWarnFn: function (msg) {
    console.log("i18n Warning:", msg);
  },
  logDebugFn: function (msg) {
    console.log("i18n Debug:", msg);
  },
  logErrorFn: function (msg) {
    console.log("i18n Error:", msg);
  },
});
app.use(i18n.init);

app.use(localizationMiddleware);

// app.use(cookieParser(process.env.JWT_SECRET));
// app.use(express.static("./public"));
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
app.use("/api/v1/orders", ordersRouter);
app.use("/api/v1/transactions", transactionsRouter);
app.use("/api/v1/reviews", reviewsRouter);
app.use("/api/v1/plan-limits", planLimitsRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/discounts", discountRouter);
app.use("/api/v1/advertisements", adsRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // await connectDB(process.env.MONGO_URL);

  try {
    await app.listen(PORT);
    const admins = await prisma.admin.count();
    if (admins == 0) {
      await prisma.admin.create({
        data: {
          name: "name",
          email: "freebie.egypt@gmail.com",
          phone: "+201225989865",
          password: await passwordEncrypt("password"),
        },
      });
    }

    console.log("PORT connected");
  } catch (err) {
    console.log(err);
  }
};
startServer();
/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmNWNjYjM4NC0wZGZlLTQ3ZmMtYmRmNi1jNGE5N2RhM2M5ZjIiLCJzZXNzaW9uSWQiOiIwZDA3MTFkYi0xMWRjLTRmZmUtYWYwNS0wZTdhMGQwNzNkZDkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTU0NzAxOTQsImV4cCI6MTc1ODA2MjE5NH0.99qf-dMSJsJEFtquONawyTc-n-GwPmv2kaUhA-PrvlA
*/
/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MDllNDc2NC05YTc4LTQzMmYtYWJjNS0xMjk5OWEyMjYxYzEiLCJzZXNzaW9uSWQiOiJjYmFlNzZiOS0zNDVlLTQyMWYtYmRiMS1kYzA1MWIxZTc0MDciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTU1MTE2NjAsImV4cCI6MTc1ODEwMzY2MH0.HK6N_tJttCA09F49IZYE0Ndx418Rnaw3cdLrsIkntAA
*/
/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDNlOGZjMy0yYTYwLTQzNDQtYTE5MC1jNDA3YmJjNzU2ODkiLCJzZXNzaW9uSWQiOiI2MzI1ODBmZC1kNWZmLTQ2MTktOTM3Yi0zODA1NDZhNTM3NDgiLCJyb2xlIjoic3RvcmUiLCJpYXQiOjE3NTU1MTAyNDcsImV4cCI6MTc1ODEwMjI0N30.qxQcZ_EKR3LuN_NLiTj3SYMiUkoVyge19JezR0upjig
*/
