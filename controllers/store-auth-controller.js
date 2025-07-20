const crypto = require("crypto");

const { StatusCodes } = require("http-status-codes");
const { phone } = require("phone");
const { prisma } = require("../config/prisma");

const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { StoreZodModel } = require("../models/store-zod-model");

const { createAccessJWT, createRefreshJWT } = require("../utils/jwt-utils");
const { passwordEncrypt, passwordCompare } = require("../utils/password-utils");
const { userConstant, storeConstant } = require("../config/constants");
const { SocialMediaZodModel } = require("../models/social-media-zod-model");
const { uploadImage } = require("../helpers/cloudinary/upload-image");
const { StoreStatus } = require("../generated/prisma");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await prisma.store.findFirst({
    where: { email: email },
  });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  if (!(user.status == StoreStatus.APPROVED)) {
    throw new UnauthenticatedError(
      "Please wait till admins approve your registeration"
    );
  }
  const isPasswordMatch = await passwordCompare({
    passwordToCmpare: password,
    password: user.password,
  });
  if (!isPasswordMatch) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // const refreshTokenSecret = crypto.randomBytes(40).toString("hex");
  // const accessTokenSecret = crypto.randomBytes(40).toString("hex");
  // const accessTokenJWT = createAccessJWT({
  //   payload: { userId: user.id, accessTokenSecret, role: storeConstant },
  // });
  // const refreshTokenJWT = createRefreshJWT({
  //   payload: { userId: user.id, refreshTokenSecret, role: storeConstant },
  // });
  const session = await prisma.session.create({
    // where: { id: user.id },
    data: {
      // isVerified: true,
      // refreshTokenSecret: refreshTokenSecret,
      // accessTokenSecret: accessTokenSecret,
      store: { connect: { id: user.id } },
    },
  });

  const accessTokenJWT = createAccessJWT({
    payload: { userId: user.id, sessionId: session.id, role: storeConstant },
  });
  const refreshTokenJWT = createRefreshJWT({
    payload: { userId: user.id, sessionId: session.id, role: storeConstant }, //adminConstant
  });

  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "Login Successfully",
    accessToken: accessTokenJWT,
    refreshToken: refreshTokenJWT,
    user: user,
  });
};

const register = async (req, res, next) => {
  const {
    username: name,
    nameEn,
    nameAr,
    bio,
    bioEn,
    bioAr,
    phone: phoneNumber,
    email,
    password,
    tiktok,
    youtube,
    facebook,
    x,
    instagram,
    // socialLinks,
    type,
  } = req.body;
  const socialLinksZodModel = SocialMediaZodModel.safeParse({
    tiktok: tiktok,
    youtube: youtube,
    facebook: facebook,
    x: x,
    instagram: instagram,
  });

  if (!socialLinksZodModel.success) {
    throw new BadRequestError(socialLinksZodModel.error.errors[0].message);
  }

  const logo = req.files.logo;
  const banner = req.files.banner;

  // console.log(logo);
  const storeZodModel = StoreZodModel.safeParse({
    name: {
      default: name,
      en: nameEn,
      ar: nameAr,
    },
    bio: {
      default: bio,
      en: bioEn,
      ar: bioAr,
    },
    logo: logo,
    banner: banner,
    phone: phoneNumber,
    email: email,
    password: password,
    type: type,
    // socialLinks: socialLinksZodModel,
    /*
      tiktok,
      youtube,
      facebook,
      x,
      instagram,
    */
  });
  // console.log(phoneNumber);
  const isPhoneValid = phone(phoneNumber.toString());

  // console.log(isPhoneValid);

  if (!storeZodModel.success) {
    throw new BadRequestError(storeZodModel.error.errors[0].message);
  }

  if (isPhoneValid.isValid != true) {
    throw new BadRequestError("The phone number is not correct");
  }
  // const storeInDB = await prisma.store.findUnique({
  //   where: { email: email, phone: phoneNumber },
  // });

  const storeInDB = await prisma.store.findFirst({
    where: { OR: [{ email: email }, { phone: phoneNumber }] },
  });
  const userInDB = await prisma.user.findFirst({
    where: { OR: [{ email: email }, { phone: phoneNumber }] },
  });
  if (storeInDB || userInDB) {
    throw new BadRequestError(
      "Account already in use or has an individal account"
    );
  }
  const [logoUploadedSecureUrl, logoUploadedPublicId] = await uploadImage({
    req: req,
    image: logo,
  });

  const [bannerUploadedSecureUrl, bannerUploadedPublicId] = await uploadImage({
    req: req,
    image: banner,
  });
  const passwordHash = await passwordEncrypt(password);
  const store = await prisma.store.create({
    data: {
      name: {
        create: {
          default: name,
          en: nameEn || name,
          ar: nameAr || name,
        },
      },
      bio: {
        create: {
          default: bio,
          en: bioEn || bio,
          ar: bioAr || bio,
        },
      },
      logo: {
        create: {
          publicId: logoUploadedPublicId,
          secureUrl: logoUploadedSecureUrl,
        },
      },
      banner: {
        create: {
          publicId: bannerUploadedPublicId,
          secureUrl: bannerUploadedSecureUrl,
        },
      },
      phone: phoneNumber,
      email: email,
      password: passwordHash,
      // socialLinksId: socialLinksDb.id,
      // socialLinks: {},
      socialLinks: {
        create: {
          tiktok: tiktok || undefined,
          youtube: youtube || undefined,
          facebook: facebook || undefined,
          x: x || undefined,
          instagram: instagram || undefined,
        },
      },
      type: type || undefined,
    },
  });

  return res.status(StatusCodes.CREATED).json({
    isSuccess: true,
    store,
    message: "Store created. Please wait for admin's approval",
  });
};

const logout = async (req, res) => {
  await prisma.store.update({
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

const deleteStore = async (req, res) => {
  const storeId = req.user.role === storeConstant ? req.user.id : req.query.id;
  const ordersInStore = await prisma.order.findFirst({
    where: {
      AND: [
        { productOrder: { every: { branch: { storeId: storeId } } } },
        { productOrder: { every: { status: "confirmed" } } },
        // { productOrder: { every: { status: { not: "pending" } } } },
      ],
    },
  });
  if (ordersInStore) {
    throw new BadRequestError({
      message: "Store has orders in progress",
    });
  }
  await prisma.store.delete({
    where: { id: storeId },
  });
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "Store deleted successfully",
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
  // console.log(userInDB.passwordTokenExpiresAt - Date());
  // console.log(userInDB.passwordTokenExpiresAt - Date() < 1000 * 60 * 10);
  // if (
  //   !(
  //     userInDB.passwordToken === token &&
  //     userInDB.passwordTokenExpiresAt - Date() < 1000 * 60 * 10
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
  //   Date() - userInDB.passwordTokenExpiresAt < 1000 * 60 * 10
  // ) {
  //   return res.status(StatusCodes.OK).json({
  //     isSuccess: true,
  //     message: "We have sent you an email. Please check your email",
  //   });
  // }
  // const passwordToken = crypto.randomBytes(70).toString("hex");
  // userInDB.passwordToken = passwordToken;
  // userInDB.passwordTokenExpiresAt = new Date(Date() + 1000 * 60 * 10); // ten mins
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
  updateProfile,
  showMe,
  resetPassword,
  forgotPassword,
  deleteStore,
};
