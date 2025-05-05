const crypto = require("crypto");

const { StatusCodes } = require("http-status-codes");
const { phone } = require("phone");
const { prisma } = require("../config/prisma");

const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { UserZodModel } = require("../models/user-zod-model");

const {
  sendTokenToCookies,
  createAccessJWT,
  createRefreshJWT,
} = require("../utils/jwt-utils");
const {
  checkOtpRestirictionsHelper,
  sendValidationEmail,
  verifyOtpHelper,
  spamOtpRequestHelper,
} = require("../helpers/redis");
const { sendOtpHelper } = require("../helpers/redis/send-otp-helper");
const { userConstant } = require("../config/constants");
//TODO AM I IN NEED TO LOGIN

const login = async (req, res) => {
  // console.log(req.ip);
  // const { email, phoneNumber } = req.body;
  // //TODO AM I IN NEED TO CHECK EMAIL
  // if (!email || !phoneNumber) {
  //   throw new BadRequestError("Invalid email or phone number");
  // }
  // const user = await prisma.user.findUnique({
  //   where: { phone: phoneNumber }, // email: email,
  // });
  // if (!user) {
  //   throw new UnauthenticatedError("Invalid Credentials");
  // }
  // if (!user.isVerified) {
  //   throw new UnauthenticatedError("Please verify your credentials");
  // }
  // const accessTokenJWT = createAccessJWT({ payload: { userId: user.id } });
  // const refreshTokenJWT = createRefreshJWT({
  //   payload: { userId: user.id },
  // });
  // return res.status(StatusCodes.OK).json({
  //   isSuccess: true,
  //   access_token: accessTokenJWT,
  //   refresh_token: refreshTokenJWT,
  //   user: user,
  // });
};

const register = async (req, res, next) => {
  const { name, phoneNumber, userCountry, dateOfBirth, gender, email, role } =
    req.body;
  const zodModel = UserZodModel.safeParse({
    name: name,
    dateOfBirth: dateOfBirth,
    gender: gender,
    email: email,
    userCountry: userCountry,
    phone: phoneNumber,
    role: role,
  });
  const isPhoneValid = phone(phoneNumber.toString());

  console.log(isPhoneValid);
  console.log(phoneNumber);

  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }

  if (isPhoneValid.isValid != true) {
    throw new BadRequestError("The phone number is not correct");
  }
  const userInDB = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { phone: phoneNumber }],
    },
  });
  const storeInDB = await prisma.store.findFirst({
    where: {
      OR: [{ email }, { phone: phoneNumber }],
    },
  });

  if (storeInDB || userInDB) {
    throw new BadRequestError(
      "Account already in use or has an individal account"
    );
  }
  const country = await prisma.country.findUnique({
    where: { countryIsoCode: userCountry },
  });
  if (!country) {
    throw new BadRequestError("Country not found");
  }
  const parse = Date.parse(dateOfBirth);

  const date = new Date(parse);
  await prisma.user.create({
    data: {
      name: name,
      dateOfBirth: date,
      gender: gender,
      email: email,
      phone: phoneNumber,
      countryId: country.id,
      role: role,
    },
  });

  /*
  ELSE SEND OTP AND CREATE USER DATA
  */
  await checkOtpRestirictionsHelper({ phone: phoneNumber, next });
  //  await prisma.user.findUnique({
  //   where: { phone: phoneNuumber },
  // });
  await spamOtpRequestHelper({ phone: phoneNumber, next });
  await sendOtpHelper({ name, phone: phoneNumber, email });
  return res.status(StatusCodes.CREATED).json({
    isSuccess: true,
    message: "OTP sent. Please check your phone",
  });
};

const verifyEmail = async (req, res) => {
  const { email, phoneNumber, verificationCode } = req.body;
  if (
    !email ||
    !phoneNumber ||
    !verificationCode ||
    verificationCode.length != 4
  ) {
    throw new BadRequestError("Please enter all data correctly");
  }
  const isPhoneValid = phone(phoneNumber);

  if (isPhoneValid.isValid != true) {
    throw new BadRequestError("The phone number is not correct");
  }
  const user = await prisma.user.findUnique({
    where: { email: email, phone: phoneNumber },
  });
  if (!user) {
    throw new NotFoundError("User not found");
  }
  await verifyOtpHelper({ phone: phoneNumber, userOtp: verificationCode });
  // user.isVerified = true;
  const refreshTokenSecret = crypto.randomBytes(40).toString("hex");
  const accessTokenSecret = crypto.randomBytes(40).toString("hex");

  await prisma.user.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      refreshTokenSecret: refreshTokenSecret,
      accessTokenSecret: accessTokenSecret,
    },
  });
  // send the jwt
  const accessTokenJWT = createAccessJWT({
    payload: { userId: user.id, accessTokenSecret, role: userConstant },
  });
  const refreshTokenJWT = createRefreshJWT({
    payload: { userId: user.id, refreshTokenSecret, role: userConstant },
  });

  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "Account verified successfully",

    access_token: accessTokenJWT,
    refresh_token: refreshTokenJWT,
    user: user,
  });
};

const logout = async (req, res) => {
  await prisma.user.update({
    where: { id: req.user.id },
    data: {
      refreshTokenSecret: null,
      accessTokenSecret: null,
    },
  });
  // res.cookie("accessToken", null, {
  //   expires: new Date(Date.now()),
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   signed: true,
  //   // maxAge: new Date(Date.now()),
  // });
  // res.cookie("refreshToken", null, {
  //   expires: new Date(Date.now()),
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   signed: true,
  //   // maxAge: new Date(Date.now()),
  // });
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "Logged out successfully",
  });
};

const updateProfile = async (req, res) => {
  // const { email, name } = req.body;
  // if (!email || !name) {
  //   throw new BadRequestError("Please enter all profile data");
  // }
  // const user = await User.findOne({ _id: req.user.userId });
  // user.email = email;
  // user.name = name;
  // await user.save();
  // const token = user.createJWT();
  // return res.status(StatusCodes.OK).json({
  //   isSuccess: true,
  //   user: {
  //     id: user.getId(),
  //     name: user.getName(),
  //     role: user.getRole(),
  //     email: user.getEmail(),
  //     token,
  //   },
  //   token,
  // });
};
const resetPassword = async (req, res) => {
  // const { email, token, password } = req.body;
  // if (!email || !token || !password) {
  //   throw new BadRequestError("Please enter valid values");
  // }
  // const userInDB = await User.findOne({ email });
  // if (!userInDB) {
  //   throw new BadRequestError("This user in not in the database");
  // }
  // console.log(userInDB.passwordTokenExpiresAt - Date.now());
  // console.log(userInDB.passwordTokenExpiresAt - Date.now() < 1000 * 60 * 10);
  // if (
  //   !(
  //     userInDB.passwordToken === token &&
  //     userInDB.passwordTokenExpiresAt - Date.now() < 1000 * 60 * 10
  //   )
  // ) {
  //   throw new BadRequestError("The password validation time is expired");
  // }
  // userInDB.password = password;
  // userInDB.passwordToken = null;
  // userInDB.passwordTokenExpiresAt = null;
  // await userInDB.save();
  // return res.status(StatusCodes.OK).json({
  //   isSuccess: true,
  //   message: "Your password has been reset successfully.",
  // });
};
const forgotPassword = async (req, res) => {
  // const { email } = req.body;
  // if (!email) {
  //   throw new BadRequestError("Please enter a valid email");
  // }
  // const userInDB = await User.findOne({ email });
  // if (!userInDB) {
  //   throw new BadRequestError("This user in not in the database");
  // }
  // if (
  //   userInDB.passwordToken &&
  //   Date.now() - userInDB.passwordTokenExpiresAt < 1000 * 60 * 10
  // ) {
  //   return res.status(StatusCodes.OK).json({
  //     isSuccess: true,
  //     message: "We have sent you an email. Please check your email",
  //   });
  // }
  // const passwordToken = crypto.randomBytes(70).toString("hex");
  // userInDB.passwordToken = passwordToken;
  // userInDB.passwordTokenExpiresAt = new Date(Date.now() + 1000 * 60 * 10); // ten mins
  // await userInDB.save();
  // const protocol = req.protocol;
  // const host = req.get("host");
  // // const origin = `http://${req.headers.host}`;
  // const origin = `${protocol}://${host}`;
  // // console.log(origin);
  // await sendResetPasswordEmail({
  //   email,
  //   name: userInDB.name,
  //   passwordToken,
  //   origin,
  // });
  // return res.status(StatusCodes.OK).json({
  //   isSuccess: true,
  //   message: "Please check your email",
  // });
};
const showMe = async (req, res) => {
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    user: req.user,
  });
};

module.exports = {
  login,
  register,
  logout,
  verifyEmail,
  updateProfile,
  showMe,
  resetPassword,
  forgotPassword,
};
