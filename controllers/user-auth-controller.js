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
const {
  UpdateUserProfileZodModel,
} = require("../models/update-user-profile-zod-model");
const { connect } = require("http2");
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
  //   accessToken: accessTokenJWT,
  //   refreshToken: refreshTokenJWT,
  //   user: user,
  // });
};

const sendCode = async (req, res, next) => {
  const { phoneNumber } = req.body;

  const isPhoneValid = phone(phoneNumber.toString());

  console.log(isPhoneValid);
  console.log(phoneNumber);

  if (isPhoneValid.isValid != true) {
    throw new BadRequestError("The phone number is not correct");
  }
  const userInDB = await prisma.session.findFirst({
    where: { user: { phone: phoneNumber } },
    select: { user: true },
  });
  const storeInDB = await prisma.store.findFirst({
    where: { phone: phoneNumber },
  });

  if (storeInDB) {
    throw new BadRequestError(
      "Account already in use or has an individal account"
    );
  }
  /*
  ELSE SEND OTP AND CREATE USER DATA
  */
  await checkOtpRestirictionsHelper({ phone: phoneNumber, next });
  //  await prisma.user.findUnique({
  //   where: { phone: phoneNuumber },
  // });
  await spamOtpRequestHelper({ phone: phoneNumber, next });
  await sendOtpHelper({
    name: "name",
    phone: phoneNumber,
    email: "el_rana111@yahoo.com",
  });
  const isAlreadyExist = userInDB ? true : false;
  console.log(isAlreadyExist);
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "OTP sent. Please check your phone",
    isAlreadyExist: userInDB ? true : false,
  });
};

const register = async (req, res, next) => {
  const { name, phoneNumber, userState, dateOfBirth, gender, fcmToken, email } =
    req.body;
  const zodModel = UserZodModel.safeParse({
    name: name,
    dateOfBirth: dateOfBirth,
    gender: gender,
    email: email,
    userState: userState,
    phone: phoneNumber,
    fcmToken: fcmToken,
  });
  const isPhoneValid = phone(phoneNumber.toString());

  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }

  if (isPhoneValid.isValid != true) {
    throw new BadRequestError("The phone number is not correct");
  }
  // const userInDB = await prisma.user.findFirst({
  //   where: {
  //     OR: [{ email }, { phone: phoneNumber }],
  //   },
  // });
  const userInDB = await prisma.session.findFirst({
    where: {
      OR: [
        { user: { OR: [{ email }, { phone: phoneNumber }] } },
        { admin: { OR: [{ email }, { phone: phoneNumber }] } },
        { store: { OR: [{ email }, { phone: phoneNumber }] } },
      ],
    },
  });
  //storeInDB ||
  if (userInDB) {
    throw new BadRequestError(
      "Account already in use or has an individal account"
    );
  }
  // const country = await prisma.country.findUnique({
  //   where: { countryIsoCode: userCountry },
  // });
  // const state = await prisma.state.findUnique({
  //   where: { countryId: userCountry, id: userState },
  // });
  // // if (!country) {
  // //   throw new BadRequestError("Country not found");
  // // }
  // if (!state) {
  //   throw new BadRequestError(
  //     "State not found or does not belong to this country"
  //   );
  // }
  const parse = Date.parse(dateOfBirth);

  const date = new Date(parse);
  //this is for detecting the user login from another device
  // const refreshTokenSecret = crypto.randomBytes(40).toString("hex");
  // const accessTokenSecret = crypto.randomBytes(40).toString("hex");
  const user = await prisma.user.create({
    data: {
      name: name,
      dateOfBirth: date,
      gender: gender,
      email: email,
      phone: phoneNumber,
      sessions: {
        create: {
          fcmToken: fcmToken,
        },
      },
      // userCountry: { connect: { id: userCountry } },
      // role: role,
      //TODO CAN ADD AN EXTRA LEVEL OF CHECK AND INTEGRATE THE VEERIFICATION WITH IOREEDIS
      isVerified: true,
      userLocations: {
        create: {
          state: { connect: { id: userState } },
        },
      },
      state: { connect: { id: userState } },
    },
    include: {
      state: { include: { country: true } },
      sessions: true,
    },
  });
  const accessTokenJWT = createAccessJWT({
    payload: {
      userId: user.id,
      sessionId: user.sessions[0].id,
      role: userConstant,
    },
  });
  const refreshTokenJWT = createRefreshJWT({
    payload: {
      userId: user.id,
      sessionId: user.sessions[0].id,
      role: userConstant,
    },
  });
  /*
  ELSE SEND OTP AND CREATE USER DATA
  */
  // await checkOtpRestirictionsHelper({ phone: phoneNumber, next });
  // //  await prisma.user.findUnique({
  // //   where: { phone: phoneNuumber },
  // // });
  // await spamOtpRequestHelper({ phone: phoneNumber, next });
  // await sendOtpHelper({ name, phone: phoneNumber, email });
  return res.status(StatusCodes.CREATED).json({
    isSuccess: true,
    message: "Account Created Successfully",
    accessToken: accessTokenJWT,
    refreshToken: refreshTokenJWT,
    user: user,
  });
};

const verifyCode = async (req, res) => {
  const { isAlreadyExist, phoneNumber, fcmToken, verificationCode } = req.body;

  if (!phoneNumber || !verificationCode || verificationCode.length != 4) {
    throw new BadRequestError("Please enter all data correctly");
  }
  const isPhoneValid = phone(phoneNumber);

  if (isPhoneValid.isValid != true) {
    throw new BadRequestError("The phone number is not correct");
  }

  await verifyOtpHelper({ phone: phoneNumber, userOtp: verificationCode });
  // user.isVerified = true;
  if (isAlreadyExist) {
    // const user = await prisma.user.findUnique({
    //   where: { phone: phoneNumber },
    // });
    // if (!user) {
    //   throw new NotFoundError("User not found");
    // }
    // const refreshTokenSecret = crypto.randomBytes(40).toString("hex");
    // const accessTokenSecret = crypto.randomBytes(40).toString("hex");

    const session = await prisma.user.update({
      where: { phone: phoneNumber },
      data: {
        sessions: {
          create: {
            fcmToken: fcmToken,
          },
        },
      },
      include: { state: { include: { country: true } }, sessions: true },
    });
    if (!session) {
      throw new NotFoundError("User not found");
    }
    // send the jwt
    const accessTokenJWT = createAccessJWT({
      payload: {
        userId: session.id,
        sessionId: session.sessions[session.sessions.length - 1].id,
        role: userConstant,
      },
    });
    const refreshTokenJWT = createRefreshJWT({
      payload: {
        userId: session.id,
        sessionId: session.sessions[session.sessions.length - 1].id,
        role: userConstant,
      },
    });

    return res.status(StatusCodes.OK).json({
      isSuccess: true,
      message: "Account verified successfully",
      accessToken: accessTokenJWT,
      refreshToken: refreshTokenJWT,
      user: session,
    });
  } else {
    return res.status(StatusCodes.OK).json({
      isSuccess: true,
      message: "Account verified successfully",

      // accessToken: accessTokenJWT,
      // refreshToken: refreshTokenJWT,
      // user: user,
    });
  }
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
  //   expires: new Date(Date()),
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   signed: true,
  //   // maxAge: new Date(Date()),
  // });
  // res.cookie("refreshToken", null, {
  //   expires: new Date(Date()),
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   signed: true,
  //   // maxAge: new Date(Date()),
  // });
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "Logged out successfully",
  });
};

const updateProfile = async (req, res) => {
  const { dateOfBirth, gender, countryId, stateId, name } = req.body;
  const zodModel = UpdateUserProfileZodModel.safeParse({
    name: name,
    dateOfBirth: dateOfBirth,
    gender: gender,
    userState: stateId,
    userCountry: countryId,
  });

  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  // const state = await prisma.state.findFirst({
  //   where: { id: stateId, countryId: countryId },
  // });
  // if (!state) {
  //   throw new BadRequestError("State not found");
  // }
  let parse;
  let date;
  if (dateOfBirth) {
    parse = Date.parse(dateOfBirth);
    date = new Date(parse);
  }
  const user = await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: {
      name: name || undefined,
      dateOfBirth: date || undefined,
      gender: gender || undefined,
      ...(stateId && {
        state:
          stateId != undefined
            ? {
                connect: {
                  id: stateId,
                  country:
                    countryId != undefined ? { is: { id: countryId } } : {},
                },
              }
            : {},
        // connect: {
        //   id: stateId || undefined,
        // },
      }),
      // ...(countryId && {
      //   userCountry:
      //     countryId != undefined ? { connect: { id: countryId } } : {},

      //   //  {
      //   //   connect: {
      //   //     id: countryId || undefined,
      //   //   },
      //   // },
      // }),
    },
  });

  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "Profile updated successfully",
    user: user,
  });
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

const showMe = async (req, res) => {
  console.log(req.user);
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    user: req.user,
  });
};

const deleteAccount = async (req, res) => {
  const email = req.query.email;
  const phone = req.query.phone;
  if (!(req.user != undefined && req.user.role === userConstant)) {
    if (!(email || phone)) {
      throw new BadRequestError("Please provide an email or phone");
    }
  }

  const order = await prisma.order.findFirst({
    where: {
      AND: [
        {
          user: {
            OR: [
              { email: email || req.user.email },
              { phone: phone || req.user.phone },
            ],
          }, //  email || req.user.id
        },
        {
          productOrder: { every: { status: { not: "delivered" } } },
        },
      ],
    },
  });
  if (order) {
    throw new BadRequestError(
      "User can not be deleted. This user has unfinished orders"
    );
  }
  await prisma.user.delete({
    where: {
      OR: [
        { email: email || req.user.email },
        { phone: phone || req.user.phone },
      ],
    },
  });
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "User deleted successfully",
  });
};
module.exports = {
  login,
  register,
  logout,
  verifyCode,
  updateProfile,
  showMe,
  deleteAccount,
  sendCode,
};
