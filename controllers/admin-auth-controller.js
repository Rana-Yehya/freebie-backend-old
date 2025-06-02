const { StatusCodes } = require("http-status-codes");
const { prisma } = require("../config/prisma");
const crypto = require("crypto");

const { createAccessJWT, createRefreshJWT } = require("../utils/jwt-utils");
const { passwordEncrypt, passwordCompare } = require("../utils/password-utils");
const { adminConstant } = require("../config/constants");

const { phone } = require("phone");

const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { UserZodModel } = require("../models/user-zod-model");

const login = async (req, res) => {
  const { phoneNumber, password } = req.body;
  if (!phoneNumber || !password) {
    throw new BadRequestError(
      "Please provide email or phone number and password"
    );
  }
  const user = await prisma.user.findUnique({
    where: { phone: phoneNumber }, // email: email,
  });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  console.log(user.password);
  console.log(password);

  const isPasswordMatch = await passwordCompare({
    passwordToCmpare: password,
    password: user.password,
  });
  if (!isPasswordMatch) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const refreshTokenSecret = crypto.randomBytes(40).toString("hex");
  const accessTokenSecret = crypto.randomBytes(40).toString("hex");
  const accessTokenJWT = createAccessJWT({
    payload: { userId: user.id, accessTokenSecret, role: adminConstant },
  });
  const refreshTokenJWT = createRefreshJWT({
    payload: { userId: user.id, refreshTokenSecret, role: adminConstant },
  });

  await prisma.user.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      refreshTokenSecret: refreshTokenSecret,
      accessTokenSecret: accessTokenSecret,
    },
  });
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    accessToken: accessTokenJWT,
    refreshToken: refreshTokenJWT,
    user: user,
  });
};
const register = async (req, res, next) => {
  const {
    name,
    phoneNumber,
    userCountry,
    dateOfBirth,
    gender,
    email,
    role,
    password,
    userState,
  } = req.body;
  if (!password) {
    throw new BadRequestError("Password is required");
  }
  const zodModel = UserZodModel.safeParse({
    name: name,
    dateOfBirth: dateOfBirth,
    gender: gender,
    email: email,
    userCountry: userCountry,
    phone: phoneNumber,
    role: role,
    password: password,
    userState: userState,
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
  // Because i have one admin, i will onlu check for the admin in middleware
  // no check in database needed
  // also, i will not check in store db
  // const userInDB = await prisma.user.findUnique({
  //   where: { email: email, phone: phoneNumber, role: admin },
  // });
  // if (!userInDB) {
  // const country = await prisma.country.findUnique({
  //   where: { countryIsoCode: userCountry },
  // });
  const state = await prisma.state.findUnique({
    where: { countryId: userCountry, id: userState },
  });
  // if (!country) {
  //   throw new BadRequestError("Country not found");
  // }
  if (!state) {
    throw new BadRequestError(
      "State not found or does not belong to this country"
    );
  }
  const parse = Date.parse(dateOfBirth);
  const passwordHash = await passwordEncrypt(password);

  const date = new Date(parse);
  await prisma.user.create({
    data: {
      name: name,
      dateOfBirth: date,
      gender: gender,
      email: email,
      phone: phoneNumber,
      countryId: userCountry,
      stateId: userState,
      role: adminConstant,
      isVerified: true,
      password: passwordHash,
    },
  });
  // }

  return res.status(StatusCodes.CREATED).json({
    isSuccess: true,
    message: "Admin Created Successfully",
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
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "Logged out successfully",
  });
};
const showMe = async (req, res) => {
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    user: req.user,
  });
};
module.exports = {
  register,
  showMe,
  logout,
  login,
};
