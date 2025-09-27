const express = require("express");
const morgan = require("morgan");

// const cookieParser = require("cookie-parser");
// const fileUpload = require("express-fileupload");
// const mongoSanitize = require("express-mongo-sanitize");

// require("dotenv").config();
// require("express-async-errors");
// require("./config/notification");
// require("./config/image-kit");
// require("./helpers/cron/check-product-discount-job");
const { prisma } = require("./config/prisma");

const adminAuthRouter = require("./routes/admin-auth-route");
const adminRouter = require("./routes/admin-route");

// const notFound = require("./middleware/not-found");
// const errorHandler = require("./middleware/error-handler");
// const {
//   localizationMiddleware,
// } = require("./middleware/localization-middleware");
const { passwordEncrypt } = require("./utils/password-utils");

const app = express();
app.use(morgan("dev"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
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
// app.use(helmet());
// app.use(xss());
// app.use(mongoSanitize());

// app.use(cookieParser());

// app.use(cookieParser(process.env.JWT_SECRET));
// app.use(express.static("./public"));
app.use(
  "/api/admin/auth",
  () => {
    console.log("admin");
  },
  adminAuthRouter
);
app.use(
  "/api/admin",
  () => {
    console.log("admin");
  },
  adminRouter
);
console.log("admin");

const PORT = process.env.ADMIN_PORT || 5001;

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
    console.log("PORT ", PORT);

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
