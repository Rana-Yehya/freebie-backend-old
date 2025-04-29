const jwt = require("jsonwebtoken");

const createJWT = (payload, expiresIn) => {
  return jwt.sign(
    // { userId: this._id, email: this.email },
    payload,
    process.env.JWT_SECRET,
    {
      expiresIn: expiresIn,
    }
  );
};

const isTokenValid = function (token) {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const sendTokenToCookies = function ({ res, user, refreshToken }) {
  console.log(new Date(Date.now() + parseInt(process.env.ACCESS_JWT_LIFETIME)));
  console.log(Date.now());
  console.log(parseInt(process.env.ACCESS_JWT_LIFETIME));
  const accessTokenJWT = createJWT(
    { userId: user._id, email: user.email },
    process.env.ACCESS_JWT_LIFETIME
  );
  const refreshTokenJWT = createJWT(
    { user: { userId: user._id, email: user.email }, refreshToken },
    process.env.REFRESH_JWT_LIFETIME
  );

  res.cookie("accessToken", accessTokenJWT, {
    expires: new Date(Date.now() + parseInt(process.env.ACCESS_JWT_LIFETIME)),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    // maxAge: new Date(Date.now() + 1000),
  });
  res.cookie("refreshToken", refreshTokenJWT, {
    expires: new Date(Date.now() + parseInt(process.env.REFRESH_JWT_LIFETIME)),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    // maxAge: new Date(Date.now() + parseInt(process.env.REFRESH_JWT_LIFETIME)),
  });
};

/*

const sendTokenToCookies = function ({ res, user,  }) {
  const token = createJWT({ payload: { userId: user._id, email: user.email } });
  // console.log(new Date(Date.now() + parseInt(process.env.JWT_LIFETIME)));
  res.cookie("token", token, {
    expires: new Date(Date.now() + parseInt(process.env.JWT_LIFETIME)),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

*/
module.exports = {
  isTokenValid,
  createJWT,
  sendTokenToCookies,
};
