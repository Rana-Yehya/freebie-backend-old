const jwt = require("jsonwebtoken");

const createAccessJWT = ({ payload }) => {
  return jwt.sign(
    // { userId: this._id, email: this.email },
    payload,
    process.env.ACCESS_JWT_SECRET,
    {
      expiresIn: parseInt(process.env.ACCESS_JWT_LIFETIME),
    }
  );
};
const createRefreshJWT = ({ payload }) => {
  return jwt.sign(
    // { userId: this._id, email: this.email },
    payload,
    process.env.REFRESH_JWT_SECRET,
    {
      expiresIn: parseInt(process.env.REFRESH_JWT_LIFETIME),
    }
  );
};
const isTokenValid = function ({ token, secret }) {
  return jwt.verify(token, secret);
};

// const sendTokenToCookies = function ({ res, user, refreshToken }) {
//   console.log(new Date(Date() + parseInt(process.env.ACCESS_JWT_LIFETIME)));
//   console.log(Date());
//   console.log(parseInt(process.env.ACCESS_JWT_LIFETIME));
//   const accessTokenJWT = createAccessJWT({ payload: { userId: user._id } });
//   const refreshTokenJWT = createRefreshJWT({
//     payload: { userId: user._id, refreshToken },
//   });

//   res.cookie("accessToken", accessTokenJWT, {
//     expires: new Date(Date() + parseInt(process.env.ACCESS_JWT_LIFETIME)),
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     signed: true,
//     // maxAge: new Date(Date() + 1000),
//   });
//   res.cookie("refreshToken", refreshTokenJWT, {
//     expires: new Date(Date() + parseInt(process.env.REFRESH_JWT_LIFETIME)),
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     signed: true,
//     // maxAge: new Date(Date() + parseInt(process.env.REFRESH_JWT_LIFETIME)),
//   });
// };

/*

const sendTokenToCookies = function ({ res, user,  }) {
  const token = createJWT({ payload: { userId: user._id, email: user.email } });
  // console.log(new Date(Date() + parseInt(process.env.JWT_LIFETIME)));
  res.cookie("token", token, {
    expires: new Date(Date() + parseInt(process.env.JWT_LIFETIME)),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

*/
module.exports = {
  isTokenValid,
  createAccessJWT,
  createRefreshJWT,
  // sendTokenToCookies,
};
