const crypto = require("crypto");

const { StatusCodes } = require("http-status-codes");
const { phone } = require("phone");
const { prisma } = require("../config/prisma");

const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { CreateStoreZodModel } = require("../models/create-store-zod-model");
const { UpdateStoreZodModel } = require("../models/update-store-zod-model");

const { createAccessJWT, createRefreshJWT } = require("../utils/jwt-utils");
const { passwordEncrypt, passwordCompare } = require("../utils/password-utils");
const { storeConstant } = require("../config/constants");
const { uploadImage } = require("../helpers/image-kit/upload-image");
const { StoreStatus, OrderStatus } = require("../generated/prisma");
const {
  checkOtpRestirictionsHelper,
  spamOtpRequestHelper,
  verifyOtpHelper,
} = require("../helpers/redis");
const { sendOtpHelper } = require("../helpers/redis/send-otp-helper");
const { destroyImage } = require("../helpers/image-kit/delete-image");

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

  const logo = req.files != undefined ? req.files.logo : undefined;
  const banner = req.files != undefined ? req.files.banner : undefined;

  // console.log(logo);
  const storeZodModel = CreateStoreZodModel.safeParse({
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
    socialLinks: {
      tiktok: tiktok,
      youtube: youtube,
      facebook: facebook,
      x: x,
      instagram: instagram,
    },
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

  if (!storeZodModel.success) {
    throw new BadRequestError(storeZodModel.error.errors[0].message);
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
  await prisma.session.delete({
    where: { id: req.session },
  });
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "Logged out successfully",
  });
};

const deleteStore = async (req, res) => {
  const storeId = req.user.id; //req.user.role === storeConstant ? req.user.id : req.params.id
  const ordersInStore = await prisma.order.findFirst({
    where: {
      AND: [
        {
          productOrder: {
            every: {
              variant: {
                productStock: { every: { branch: { storeId: storeId } } },
              },
            },
          },
        },
        {
          productOrder: {
            every: {
              status: { notIn: [OrderStatus.DELIVERED, OrderStatus.CANCELLED] },
            },
          },
        },
        // { productOrder: { every: { status: { not: "pending" } } } },
      ],
    },
  });
  if (ordersInStore) {
    throw new BadRequestError("Store has orders in progress");
  }
  await prisma.store.delete({
    where: { id: storeId },
  });
  await prisma.session.deleteMany({
    where: { storeId: storeId },
  });
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "Store deleted successfully",
  });
};
const updateProfile = async (req, res) => {
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

  const logo = req.files != undefined ? req.files.logo : undefined;
  const banner = req.files != undefined ? req.files.banner : undefined;

  // console.log(logo);
  const storeZodModel = UpdateStoreZodModel.safeParse({
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
    socialLinks: {
      tiktok: tiktok,
      youtube: youtube,
      facebook: facebook,
      x: x,
      instagram: instagram,
    },
  });

  // console.log(isPhoneValid);

  if (!storeZodModel.success) {
    throw new BadRequestError(storeZodModel.error.errors[0].message);
  }

  let logoUploadedSecureUrl, logoUploadedPublicId;
  if (logo) {
    [logoUploadedSecureUrl, logoUploadedPublicId] = await uploadImage({
      req: req,
      image: logo,
    });
  }
  let bannerUploadedSecureUrl, bannerUploadedPublicId;
  if (banner) {
    [bannerUploadedSecureUrl, bannerUploadedPublicId] = await uploadImage({
      req: req,
      image: banner,
    });
  }

  const store = await prisma.store.update({
    where: { id: req.user.id },
    data: {
      name: {
        update: {
          default: name || undefined,
          en: nameEn || undefined,
          ar: nameAr || undefined,
        },
      },
      bio: {
        update: {
          default: bio || undefined,
          en: bioEn || undefined,
          ar: bioAr || undefined,
        },
      },
      logo: {
        update: {
          publicId: logoUploadedPublicId || undefined,
          secureUrl: logoUploadedSecureUrl || undefined,
        },
      },
      banner: {
        update: {
          publicId: bannerUploadedPublicId || undefined,
          secureUrl: bannerUploadedSecureUrl || undefined,
        },
      },
      phone: phoneNumber || undefined,
      email: email || undefined,
      // socialLinksId: socialLinksDb.id,
      // socialLinks: {},
      socialLinks: {
        update: {
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
  if (logo) {
    await destroyImage({
      imagePublicId: req.user.logo.publicId,
    });
  }
  if (banner) {
    await destroyImage({
      imagePublicId: req.user.banner.publicId,
    });
  }
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    store,
    message: "Store updated successfully",
  });
};
const changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  if (!oldPassword || !newPassword || !confirmNewPassword) {
    throw new BadRequestError("Please enter valid passwords");
  }
  if (newPassword !== confirmNewPassword) {
    throw new BadRequestError("Passwords do not match");
  }
  const doPasswordsMatch = await passwordCompare({
    passwordToCmpare: oldPassword,
    password: req.user.password,
  });
  if (!doPasswordsMatch) {
    throw new BadRequestError("Old password is incorrect");
  }
  const hashedPassword = await passwordEncrypt(newPassword);
  const store = await prisma.store.update({
    where: { id: req.user.id },
    data: {
      password: hashedPassword,
    },
  });

  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    store,
    message: "Store password updated successfully",
  });
};

const sendCode = async (req, res, next) => {
  const { phoneNumber } = req.body;

  const isPhoneValid = phone(phoneNumber.toString());

  console.log(isPhoneValid);
  console.log(phoneNumber);

  if (isPhoneValid.isValid != true) {
    throw new BadRequestError("The phone number is not correct");
  }
  const storeInDB = await prisma.store.findUnique({
    where: { phone: phoneNumber },
    include: { name: true },
  });

  if (!storeInDB) {
    throw new BadRequestError("Account does not exist. Please register first");
  }
  if (storeInDB.status != StoreStatus.APPROVED) {
    throw new BadRequestError("Your account is not approved yet");
  }
  await checkOtpRestirictionsHelper({ phone: phoneNumber, next });

  await spamOtpRequestHelper({ phone: phoneNumber, next });
  await sendOtpHelper({
    name: storeInDB.name.default,
    phone: phoneNumber,
    email: "el_rana111@yahoo.com",
  });
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "OTP sent. Please check your phone",
  });
};

const verifyCode = async (req, res) => {
  const { phoneNumber, verificationCode } = req.body;

  if (!phoneNumber || !verificationCode || verificationCode.length != 4) {
    throw new BadRequestError("Please enter all data correctly");
  }
  const isPhoneValid = phone(phoneNumber);

  if (isPhoneValid.isValid != true) {
    throw new BadRequestError("The phone number is not correct");
  }

  await verifyOtpHelper({ phone: phoneNumber, userOtp: verificationCode });
  // user.isVerified = true;
  const passwordChangeBefore = new Date(Date.now() + 1 * (60 * 60 * 1000));
  const store = await prisma.store.update({
    where: { phone: phoneNumber },
    data: { passwordChangeBefore: passwordChangeBefore },
  });
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "Account verified successfully",
    store: store,
  });
};
const forgotPassword = async (req, res) => {
  const { phoneNumber, newPassword, confirmNewPassword } = req.body;
  if (!phoneNumber || !newPassword || !confirmNewPassword) {
    throw new BadRequestError("Please enter valid phone and passwords");
  }
  if (newPassword !== confirmNewPassword) {
    throw new BadRequestError("Passwords do not match");
  }

  const isPhoneValid = phone(phoneNumber);

  if (isPhoneValid.isValid != true) {
    throw new BadRequestError("The phone number is not correct");
  }
  const storeInDB = await prisma.store.findUnique({
    where: { phone: phoneNumber },
  });

  if (!storeInDB) {
    throw new BadRequestError("Account does not exist. Please register first");
  }
  if (storeInDB.status != StoreStatus.APPROVED) {
    throw new BadRequestError("Your account is not approved yet");
  }
  if (
    storeInDB.passwordChangeBefore == undefined ||
    storeInDB.passwordChangeBefore <= new Date()
  ) {
    throw new BadRequestError("Password reset time has expired");
  }
  const hashedPassword = await passwordEncrypt(newPassword);

  const store = await prisma.store.update({
    where: { id: storeInDB.id },
    data: {
      password: hashedPassword,
      passwordChangeBefore: null,
    },
  });
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "Password changed successfully",
    store: store,
  });
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
  sendCode,
  changePassword,
  verifyCode,
  forgotPassword,
  deleteStore,
};
